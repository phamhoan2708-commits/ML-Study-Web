from pathlib import Path

import joblib
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor
from sklearn.impute import SimpleImputer
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

ROOT = Path(__file__).parent
DATA_PATH = ROOT / "data" / "students.csv"
MODEL_DIR = ROOT / "models"
MODEL_PATH = MODEL_DIR / "student_success_model.joblib"

df = pd.read_csv(DATA_PATH)
df.columns = df.columns.str.strip().str.lower()

features = [
    "gender",
    "class",
    "study_hours",
    "attendance",
    "previous_score",
    "absences",
    "parent_support",
    "internet_access",
]
target = "final_score"

X = df[features]
y = df[target]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

numeric_features = ["study_hours", "attendance", "previous_score", "absences"]
categorical_features = ["gender", "class", "parent_support", "internet_access"]

numeric_pipeline = Pipeline(
    [
        ("imputer", SimpleImputer(strategy="median")),
        ("scaler", StandardScaler()),
    ]
)

preprocessor = ColumnTransformer(
    [
        ("num", numeric_pipeline, numeric_features),
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features),
    ]
)

model = Pipeline(
    [
        ("preprocess", preprocessor),
        ("regressor", RandomForestRegressor(n_estimators=200, random_state=42)),
    ]
)

model.fit(X_train, y_train)
y_pred = model.predict(X_test)

metrics = {
    "MAE": mean_absolute_error(y_test, y_pred),
    "RMSE": mean_squared_error(y_test, y_pred, squared=False),
    "R2": r2_score(y_test, y_pred),
}

MODEL_DIR.mkdir(exist_ok=True)
joblib.dump(model, MODEL_PATH)

print("Saved model:", MODEL_PATH)
print({key: round(value, 3) for key, value in metrics.items()})
