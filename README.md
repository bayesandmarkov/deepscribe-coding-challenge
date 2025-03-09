## Deepscribe AI Engineer Coding Challenge
Author: William Pang
Date: March 8, 2025

## Getting Started

1. Ensure that you have Node.js installed, which can be found on the [official website]( https://nodejs.org/)

2. Clone this project onto your local machine
```
git clone https://github.com/bayesandmarkov/deepscribe-coding-challenge/
```
3. (Recommended) Using your terminal, `cd` into the project root folder, create a virtual environment:
```
python3 -m venv venv
source venv/bin/activate
```

Note that the latest Python version is required (as of writing, it is **Python 3.13.2**)

4. Install all the required Python packages

```
pip install -r requirements.txt
```

5. Install all the required Node.js packages
```
npm install
```

6. Create a `.env` folder in the project root, with the following variables:
```
MONGO_URI=
DB=
COLLECTION=
OPENAI_API_KEY=
CONVERSATIONAL_HISTORY_COLLECTION=
```

7. In your IDE of choice, run the development server via the terminal:
```
npm run dev
```
Open http://localhost:3000 with your browser to see the result.

8. In a separate terminal, run fastapi using Uvicorn:

```
uvicorn api.main:app --host 0.0.0.0 --port 8000 --reload
```