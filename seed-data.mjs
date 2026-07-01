import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL is required to seed the database.");
  process.exit(1);
}

const chaptersData = [
  {
    title: "Python Foundation",
    description: "Làm chủ cú pháp Python để xử lý dữ liệu",
    order: 1,
    content: `# Python Foundation for ML

## Mục tiêu
Làm chủ cú pháp Python để xử lý dữ liệu và chuẩn bị nền tảng cho Machine Learning.

## Nội dung chính
- Biến, List, Dictionary
- Vòng lặp for/while
- Hàm và xử lý ngoại lệ
- Thiết lập môi trường thực tế

## Kỹ năng sẽ học
1. Cấu trúc dữ liệu cơ bản
2. Tư duy lập trình
3. Xử lý lỗi
4. Quản lý thư viện Python`
  },
  {
    title: "Pandas: Phù thủy dữ liệu",
    description: "Đọc, làm sạch và phân tích tập dữ liệu thực tế",
    order: 2,
    content: `# Pandas: Phù thủy dữ liệu

## Mục tiêu
Đọc, xử lý và làm sạch tập dữ liệu thực tế bằng Pandas.

## Nội dung chính
- Cấu trúc DataFrame
- Đọc file CSV
- Làm sạch dữ liệu
- Truy vấn, gom nhóm và thống kê`
  },
  {
    title: "Data Visualization & EDA",
    description: "Tìm ra quy luật thông qua biểu đồ",
    order: 3,
    content: `# Data Visualization & EDA

## Mục tiêu
Tìm ra quy luật, ngoại lệ và mối liên hệ trong dữ liệu thông qua trực quan hóa.

## Nội dung chính
- Histogram, Boxplot, Bar chart
- Scatter plot và Heatmap
- Phân tích tương quan
- Kể chuyện bằng dữ liệu`
  },
  {
    title: "Machine Learning với Scikit-learn",
    description: "Huấn luyện và đánh giá mô hình dự báo",
    order: 4,
    content: `# Machine Learning với Scikit-learn

## Mục tiêu
Huấn luyện, đánh giá và lưu trữ mô hình Machine Learning để dự báo kết quả.

## Nội dung chính
- Tiền xử lý dữ liệu
- Chia tập train/test
- Random Forest
- MAE, R² Score và lưu mô hình`
  },
  {
    title: "FastAPI Backend",
    description: "Biến mô hình thành dịch vụ web API",
    order: 5,
    content: `# FastAPI Backend

## Mục tiêu
Đưa mô hình Machine Learning vào một API có thể nhận dữ liệu và trả dự báo.

## Nội dung chính
- Tạo ứng dụng FastAPI
- Định nghĩa request model bằng Pydantic
- Tạo endpoint POST
- Tích hợp model đã huấn luyện`
  },
  {
    title: "Streamlit Frontend",
    description: "Hoàn thiện giao diện cho sản phẩm cuối khóa",
    order: 6,
    content: `# Streamlit Frontend

## Mục tiêu
Xây dựng giao diện web để người dùng tương tác với mô hình ML.

## Nội dung chính
- Tạo form nhập liệu
- Gọi API dự báo
- Hiển thị kết quả và biểu đồ
- Đóng gói sản phẩm cuối khóa`
  }
];

const lesson = (chapterId, order, title, description, content, codeSnippet, codeExplanation) => ({
  chapterId,
  order,
  title,
  description,
  content,
  codeSnippet,
  codeExplanation,
});

const lessonsData = [
  lesson(
    1,
    1,
    "Cấu trúc dữ liệu & tư duy lập trình",
    "Học về biến, list, dictionary và vòng lặp",
    "Bạn sẽ dùng list và dictionary để biểu diễn dữ liệu học sinh trước khi đưa vào Pandas.",
    `name = "Alice"
age = 25
scores = [85, 90, 78, 92]

student = {
    "name": name,
    "age": age,
    "scores": scores,
}

for score in student["scores"]:
    print(f"Score: {score}")`,
    `Dòng 1-3: Khai báo dữ liệu cơ bản.
Dòng 5-9: Gom dữ liệu vào dictionary.
Dòng 11-12: Duyệt từng điểm số để xử lý.`
  ),
  lesson(
    1,
    2,
    "Hàm & xử lý ngoại lệ",
    "Định nghĩa hàm, tham số, giá trị trả về và try-except",
    "Hàm giúp bạn đóng gói logic tính toán để tái sử dụng trong pipeline ML.",
    `def calculate_average(scores):
    if not scores:
        raise ValueError("Danh sách điểm không được trống")
    return sum(scores) / len(scores)

try:
    avg = calculate_average([85, 90, 78, 92])
    print(f"Điểm trung bình: {avg:.2f}")
except ValueError as error:
    print(error)`,
    `Dòng 1-4: Tạo hàm tính điểm trung bình và kiểm tra dữ liệu rỗng.
Dòng 6-10: Gọi hàm trong khối try-except để xử lý lỗi rõ ràng.`
  ),
  lesson(
    1,
    3,
    "Thiết lập môi trường thực tế",
    "Cài đặt môi trường và quản lý thư viện",
    "Bạn sẽ tạo môi trường riêng để dự án ML có dependency ổn định.",
    `python -m venv ml_env
ml_env\\Scripts\\activate
pip install pandas numpy scikit-learn matplotlib seaborn
python --version
pip list`,
    `Dòng 1-2: Tạo và kích hoạt virtual environment trên Windows.
Dòng 3: Cài các thư viện nền tảng.
Dòng 4-5: Kiểm tra phiên bản và danh sách package.`
  ),
  lesson(
    2,
    1,
    "Làm quen với DataFrame",
    "Đọc CSV, xem dữ liệu đầu và thống kê cơ bản",
    "DataFrame là cấu trúc chính để xử lý dữ liệu dạng bảng trong Pandas.",
    `import pandas as pd

df = pd.read_csv("students.csv")
print(df.head())
print(df.info())
print(df.describe())`,
    `Dòng 1: Import Pandas.
Dòng 3: Đọc CSV thành DataFrame.
Dòng 4-6: Quan sát dữ liệu, schema và thống kê nhanh.`
  ),
  lesson(
    2,
    2,
    "Làm sạch dữ liệu",
    "Xử lý NaN, xóa trùng lặp và đổi tên cột",
    "Dữ liệu sạch giúp mô hình học đúng tín hiệu thay vì học nhiễu.",
    `df = df.drop_duplicates()
df["study_hours"] = df["study_hours"].fillna(df["study_hours"].median())
df = df.rename(columns={"final score": "final_score"})
print(df.isnull().sum())`,
    `Dòng 1: Loại bỏ bản ghi trùng.
Dòng 2: Điền giá trị thiếu bằng median.
Dòng 3: Chuẩn hóa tên cột.
Dòng 4: Kiểm tra số lượng giá trị thiếu còn lại.`
  ),
  lesson(
    2,
    3,
    "Truy vấn & thống kê",
    "Lọc dữ liệu, dùng loc và groupby",
    "Các thao tác lọc và gom nhóm giúp bạn trả lời câu hỏi trước khi xây mô hình.",
    `high_scores = df[df["final_score"] >= 80]
above_avg = df.loc[df["final_score"] > df["final_score"].mean()]
class_summary = df.groupby("class")["final_score"].agg(["mean", "std", "count"])
print(class_summary)`,
    `Dòng 1-2: Lọc học sinh theo điều kiện điểm.
Dòng 3: Gom nhóm theo lớp và tính thống kê.
Dòng 4: In bảng tóm tắt.`
  ),
  lesson(
    3,
    1,
    "Biểu đồ cơ bản với Seaborn",
    "Histogram, boxplot và bar chart",
    "Biểu đồ giúp phát hiện phân phối, ngoại lệ và khác biệt giữa các nhóm.",
    `import matplotlib.pyplot as plt
import seaborn as sns

sns.histplot(data=df, x="final_score", bins=20)
plt.title("Phân phối điểm cuối kỳ")
plt.show()

sns.boxplot(data=df, x="class", y="final_score")
plt.title("Điểm theo lớp")
plt.show()`,
    `Dòng 1-2: Import thư viện vẽ biểu đồ.
Dòng 4-6: Vẽ histogram để xem phân phối điểm.
Dòng 8-10: Vẽ boxplot để so sánh giữa các lớp.`
  ),
  lesson(
    3,
    2,
    "Phân tích tương quan",
    "Scatter plot và heatmap",
    "Tương quan giúp chọn đặc trưng có liên hệ mạnh với mục tiêu dự báo.",
    `sns.scatterplot(data=df, x="study_hours", y="final_score")
plt.title("Giờ học và điểm cuối kỳ")
plt.show()

correlation = df.corr(numeric_only=True)
sns.heatmap(correlation, annot=True, cmap="coolwarm")
plt.title("Ma trận tương quan")
plt.show()`,
    `Dòng 1-3: Vẽ scatter plot giữa giờ học và điểm.
Dòng 5: Tính tương quan các cột số.
Dòng 6-8: Vẽ heatmap để đọc quan hệ giữa nhiều biến.`
  ),
  lesson(
    3,
    3,
    "Kể chuyện bằng dữ liệu",
    "Biến insight thành kết luận dễ hiểu",
    "EDA tốt không chỉ có biểu đồ đẹp, mà còn có nhận xét giúp định hướng mô hình.",
    `summary = df.groupby("class")["final_score"].mean().sort_values()
ax = summary.plot(kind="bar", title="Điểm trung bình theo lớp")
ax.set_xlabel("Lớp")
ax.set_ylabel("Điểm trung bình")`,
    `Dòng 1: Tạo bảng điểm trung bình theo lớp.
Dòng 2-4: Vẽ bar chart và đặt nhãn rõ ràng.`
  ),
  lesson(
    4,
    1,
    "Tiền xử lý dữ liệu",
    "Encoding, scaling và tách feature/target",
    "Mô hình ML cần đầu vào dạng số và cùng thang đo hợp lý.",
    `from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer

numeric_features = ["study_hours", "attendance", "previous_score"]
categorical_features = ["class"]

preprocessor = ColumnTransformer([
    ("num", StandardScaler(), numeric_features),
    ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features),
])`,
    `Dòng 1-2: Import công cụ tiền xử lý.
Dòng 4-5: Khai báo cột số và cột phân loại.
Dòng 7-10: Tạo pipeline biến đổi dữ liệu.`
  ),
  lesson(
    4,
    2,
    "Huấn luyện mô hình",
    "Chia train/test và dùng Random Forest",
    "Bạn sẽ huấn luyện mô hình hồi quy để dự báo điểm cuối kỳ.",
    `from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import Pipeline

X = df[["study_hours", "attendance", "previous_score", "class"]]
y = df["final_score"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = Pipeline([
    ("preprocess", preprocessor),
    ("regressor", RandomForestRegressor(n_estimators=100, random_state=42)),
])
model.fit(X_train, y_train)`,
    `Dòng 1-3: Import công cụ cần thiết.
Dòng 5-7: Tách X/y và chia train/test.
Dòng 9-13: Kết hợp preprocessing với Random Forest trong một pipeline.`
  ),
  lesson(
    4,
    3,
    "Đánh giá & lưu mô hình",
    "MAE, R² Score và joblib",
    "Đánh giá giúp biết mô hình dự báo lệch bao nhiêu và có đủ tốt để triển khai không.",
    `from sklearn.metrics import mean_absolute_error, r2_score
import joblib

y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"MAE: {mae:.2f}, R²: {r2:.2f}")
joblib.dump(model, "student_success_model.pkl")`,
    `Dòng 1-2: Import metric và công cụ lưu mô hình.
Dòng 4-6: Dự báo và tính MAE/R².
Dòng 8-9: In kết quả và lưu model ra file.`
  ),
  lesson(
    5,
    1,
    "Xây dựng API cơ bản",
    "Khởi tạo FastAPI và định nghĩa endpoint POST",
    "API là lớp trung gian để frontend gửi dữ liệu và nhận dự báo từ model.",
    `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class StudentData(BaseModel):
    study_hours: float
    attendance: float
    previous_score: float
    class_name: str

@app.post("/predict")
def predict(data: StudentData):
    return {"prediction": 85.5}`,
    `Dòng 1-4: Tạo ứng dụng FastAPI.
Dòng 6-10: Định nghĩa schema input bằng Pydantic.
Dòng 12-14: Tạo endpoint POST trả kết quả mẫu.`
  ),
  lesson(
    5,
    2,
    "Tích hợp mô hình",
    "Load file .pkl và trả về dự báo",
    "Endpoint sẽ dùng model đã lưu từ chương 4 để tạo dự báo thật.",
    `import joblib

model = joblib.load("student_success_model.pkl")

@app.post("/predict")
def predict(data: StudentData):
    input_data = [{
        "study_hours": data.study_hours,
        "attendance": data.attendance,
        "previous_score": data.previous_score,
        "class": data.class_name,
    }]
    prediction = model.predict(input_data)[0]
    return {"prediction": float(prediction)}`,
    `Dòng 1-3: Load model từ file.
Dòng 5-12: Chuyển request thành input đúng schema.
Dòng 13-14: Dự báo và trả JSON.`
  ),
  lesson(
    5,
    3,
    "Kiểm thử API",
    "Chạy uvicorn và gửi request thử",
    "Kiểm thử sớm giúp bạn phát hiện lỗi schema, kiểu dữ liệu và response.",
    `uvicorn main:app --reload

curl -X POST http://localhost:8000/predict \\
  -H "Content-Type: application/json" \\
  -d "{\\"study_hours\\":10,\\"attendance\\":90,\\"previous_score\\":78,\\"class_name\\":\\"A\\"}"`,
    `Dòng 1: Chạy server local.
Dòng 3-5: Gửi request POST thử tới endpoint predict.`
  ),
  lesson(
    6,
    1,
    "Xây dựng giao diện Streamlit",
    "Tạo form nhập liệu và hiển thị kết quả",
    "Streamlit giúp biến model thành demo sản phẩm nhanh và dễ chia sẻ.",
    `import streamlit as st
import requests

st.title("Student Success Predictor")

study_hours = st.slider("Giờ học/tuần", 0, 30, 10)
attendance = st.slider("Tỷ lệ điểm danh", 0, 100, 85)
previous_score = st.slider("Điểm trước đó", 0, 100, 75)
class_name = st.selectbox("Lớp", ["A", "B", "C"])

if st.button("Dự báo"):
    response = requests.post("http://localhost:8000/predict", json={
        "study_hours": study_hours,
        "attendance": attendance,
        "previous_score": previous_score,
        "class_name": class_name,
    })
    st.success(f"Dự báo điểm: {response.json()['prediction']:.1f}")`,
    `Dòng 1-4: Khởi tạo app Streamlit.
Dòng 6-9: Tạo form nhập liệu.
Dòng 11-18: Gửi dữ liệu tới API và hiển thị kết quả.`
  ),
  lesson(
    6,
    2,
    "Hiển thị insight",
    "Thêm biểu đồ và thông tin giải thích",
    "Giao diện tốt cần giúp người dùng hiểu kết quả, không chỉ thấy một con số.",
    `st.subheader("Thông tin đầu vào")
st.metric("Giờ học/tuần", study_hours)
st.metric("Tỷ lệ điểm danh", f"{attendance}%")

if attendance < 70:
    st.warning("Tỷ lệ điểm danh thấp có thể ảnh hưởng tới kết quả.")`,
    `Dòng 1-3: Hiển thị input dưới dạng metric.
Dòng 5-6: Đưa cảnh báo đơn giản dựa trên dữ liệu người dùng.`
  ),
  lesson(
    6,
    3,
    "Đóng gói sản phẩm",
    "Chuẩn bị README, requirements và hướng dẫn chạy",
    "Bước cuối giúp dự án dễ cài đặt, kiểm thử và trình bày.",
    `pip freeze > requirements.txt

# Chạy backend
uvicorn main:app --reload

# Chạy frontend
streamlit run app.py`,
    `Dòng 1: Ghi lại dependency.
Dòng 4: Chạy FastAPI backend.
Dòng 7: Chạy Streamlit frontend.`
  ),
];

const cheatSheetsData = [
  {
    title: "Pandas Cheat Sheet",
    category: "Pandas",
    content: `# Pandas Cheat Sheet

## Đọc dữ liệu
\`\`\`python
import pandas as pd
df = pd.read_csv("file.csv")
df.head()
df.info()
df.describe()
\`\`\`

## Làm sạch dữ liệu
\`\`\`python
df.drop_duplicates()
df.fillna(0)
df.rename(columns={"old": "new"})
df.isnull().sum()
\`\`\`

## Truy vấn và gom nhóm
\`\`\`python
df[df["score"] > 80]
df.loc[df["score"] > df["score"].mean()]
df.groupby("class")["score"].mean()
\`\`\``,
    searchKeywords: "pandas dataframe read filter clean groupby"
  },
  {
    title: "Scikit-learn Cheat Sheet",
    category: "Scikit-learn",
    content: `# Scikit-learn Cheat Sheet

## Chia dữ liệu
\`\`\`python
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
\`\`\`

## Huấn luyện
\`\`\`python
from sklearn.ensemble import RandomForestRegressor
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
\`\`\`

## Đánh giá và lưu model
\`\`\`python
from sklearn.metrics import mean_absolute_error, r2_score
import joblib

y_pred = model.predict(X_test)
print(mean_absolute_error(y_test, y_pred), r2_score(y_test, y_pred))
joblib.dump(model, "model.pkl")
\`\`\``,
    searchKeywords: "scikit-learn sklearn model train predict evaluate"
  },
  {
    title: "FastAPI Cheat Sheet",
    category: "FastAPI",
    content: `# FastAPI Cheat Sheet

## Tạo ứng dụng
\`\`\`python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()
\`\`\`

## Request model và endpoint
\`\`\`python
class Item(BaseModel):
    name: str
    price: float

@app.post("/items")
def create_item(item: Item):
    return item
\`\`\`

## Chạy app
\`\`\`bash
uvicorn main:app --reload
\`\`\``,
    searchKeywords: "fastapi api endpoint pydantic uvicorn"
  },
];

async function seedDatabase() {
  const connection = await mysql.createConnection(DATABASE_URL);

  try {
    for (const chapter of chaptersData) {
      await connection.execute(
        "INSERT INTO chapters (title, description, `order`, content) VALUES (?, ?, ?, ?)",
        [chapter.title, chapter.description, chapter.order, chapter.content]
      );
    }
    console.log("✓ Chapters inserted");

    for (const item of lessonsData) {
      await connection.execute(
        "INSERT INTO lessons (chapterId, title, description, `order`, content, codeSnippet, codeExplanation) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [item.chapterId, item.title, item.description, item.order, item.content, item.codeSnippet, item.codeExplanation]
      );
    }
    console.log("✓ Lessons inserted");

    for (const sheet of cheatSheetsData) {
      await connection.execute(
        "INSERT INTO cheatSheets (title, category, content, searchKeywords) VALUES (?, ?, ?, ?)",
        [sheet.title, sheet.category, sheet.content, sheet.searchKeywords]
      );
    }
    console.log("✓ Cheat sheets inserted");
    console.log("✓ Database seeding completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exitCode = 1;
  } finally {
    await connection.end();
  }
}

seedDatabase();
