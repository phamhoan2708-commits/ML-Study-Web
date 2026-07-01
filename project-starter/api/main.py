from pathlib import Path

import joblib
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

ROOT = Path(__file__).resolve().parents[1]
MODEL_PATH = ROOT / "models" / "student_success_model.joblib"

app = FastAPI(title="Student Success Predictor API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8501", "http://127.0.0.1:8501"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load(MODEL_PATH)


class StudentInput(BaseModel):
    gender: str
    class_name: str
    study_hours: float = Field(ge=0, le=40)
    attendance: float = Field(ge=0, le=100)
    previous_score: float = Field(ge=0, le=100)
    absences: int = Field(ge=0, le=100)
    parent_support: str
    internet_access: str


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/predict")
def predict(payload: StudentInput):
    row = pd.DataFrame(
        [
            {
                "gender": payload.gender,
                "class": payload.class_name,
                "study_hours": payload.study_hours,
                "attendance": payload.attendance,
                "previous_score": payload.previous_score,
                "absences": payload.absences,
                "parent_support": payload.parent_support,
                "internet_access": payload.internet_access,
            }
        ]
    )
    prediction = float(model.predict(row)[0])
    return {
        "predicted_final_score": round(prediction, 2),
        "model_version": "v1",
    }
