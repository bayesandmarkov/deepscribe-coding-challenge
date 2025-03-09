from fastapi import FastAPI, File, UploadFile, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
from bson.objectid import ObjectId
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.chat_models import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from pydantic import BaseModel
import uuid
from langchain_mongodb.chat_message_histories import MongoDBChatMessageHistory
from api.prompts.soap_chatbot import system_prompt

# Load environment variables
load_dotenv(override=True)

# FastAPI instance
app = FastAPI()

# Allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow only specified origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


# MongoDB connection
client = AsyncIOMotorClient(os.getenv("MONGO_URI"))
db = client[f"{os.getenv("DB")}"]
collection = db[f"{os.getenv("COLLECTION")}"]

# Define a request model
class MessageRequest(BaseModel):
    message: str
    context_from_file: str
    session_id: str

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    
    session_id = str(uuid.uuid4())
    content = await file.read()  # Read file content

    # Store in MongoDB
    document = {
        "session_id": session_id,
        "filename": file.filename,
        "content_type": file.content_type,
        "content": content.decode("utf-8"),  
    }
    
    result = await collection.insert_one(document)

    return {"message": "File uploaded successfully", "file_id": str(result.inserted_id), "session_id": session_id}

@app.get("/retrieve/")
async def get_latest_text():
    record = await collection.find_one(sort=[("_id", -1)])
    if record:
        return {"text": record["content"], "session_id": record["session_id"]}
    raise HTTPException(status_code=404, detail="No text found")

@app.post("/chat/")
async def chat_with_llm(request: MessageRequest):
    try:
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", system_prompt.substitute(document_text=request.context_from_file)),
                MessagesPlaceholder(variable_name="history"),
                ("human", "{question}"),
            ]
        )

        chain = prompt | ChatOpenAI()

        chain_with_history = RunnableWithMessageHistory(
            chain,
            lambda session_id: MongoDBChatMessageHistory(
                session_id=request.session_id,
                connection_string=os.getenv("MONGO_URI"),
                database_name=f"{os.getenv("DB")}",
                collection_name=f"{os.getenv("CONVERSATIONAL_HISTORY_COLLECTION")}"
            ),
            input_messages_key="question",
            history_messages_key="history",
        )

        config = {"configurable": {"session_id": f"{request.session_id}"}}

        try:
            response = chain_with_history.invoke({"question": request.message}, config=config)
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=str(e))
        return {"response": response}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))