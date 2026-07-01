export type Chapter = {
  id: number;
  title: string;
  description: string;
  order: number;
  content: string;
};

export type Lesson = {
  id: number;
  chapterId: number;
  title: string;
  description: string;
  order: number;
  content: string;
  codeSnippet: string;
  codeExplanation: string;
};

export type CheatSheet = {
  id: number;
  title: string;
  category: string;
  content: string;
  searchKeywords: string;
};

export const chapters: Chapter[] = [
  {
    id: 1,
    order: 1,
    title: "Python Foundation",
    description: "Củng cố Python đủ dùng cho xử lý dữ liệu và Machine Learning.",
    content: `Mục tiêu chương
- Viết được script Python rõ ràng, có hàm, cấu trúc dữ liệu và xử lý lỗi.
- Biết đọc/ghi file CSV ở mức cơ bản trước khi chuyển sang Pandas.
- Tạo môi trường ảo và quản lý package bằng pip.

Vì sao cần học kỹ?
Machine Learning không bắt đầu từ model. Nó bắt đầu từ dữ liệu, hàm xử lý, kiểm tra lỗi và cách tổ chức code. Nếu Python chưa chắc, sinh viên sẽ rất dễ bị kẹt khi pipeline có nhiều bước.

Nguồn tham khảo chính
- Python Tutorial: Data structures, functions, errors/exceptions, virtual environments.
- Python Standard Library: csv, pathlib, json.`
  },
  {
    id: 2,
    order: 2,
    title: "Pandas for Data Preparation",
    description: "Đọc, hiểu, làm sạch và tổng hợp dữ liệu dạng bảng.",
    content: `Mục tiêu chương
- Hiểu Series, DataFrame, index, column và dtype.
- Đọc CSV, kiểm tra dữ liệu thiếu, dữ liệu trùng, kiểu dữ liệu sai.
- Tạo bảng thống kê và feature phục vụ mô hình.

Vì sao cần học kỹ?
Phần lớn thời gian của một project ML thực tế nằm ở bước chuẩn bị dữ liệu. Pandas là công cụ trung tâm để biến dữ liệu thô thành dữ liệu có thể học được.

Nguồn tham khảo chính
- pandas "10 minutes to pandas".
- pandas User Guide: IO tools, missing data, indexing, groupby.`
  },
  {
    id: 3,
    order: 3,
    title: "EDA & Data Visualization",
    description: "Khám phá dữ liệu bằng thống kê mô tả và biểu đồ.",
    content: `Mục tiêu chương
- Đặt câu hỏi đúng trước khi huấn luyện mô hình.
- Vẽ histogram, boxplot, scatter plot, heatmap và bar chart.
- Phát hiện outlier, phân phối lệch, tương quan và data leakage.

Vì sao cần học kỹ?
EDA giúp sinh viên hiểu dữ liệu thay vì chỉ gọi model.fit(). Một mô hình tốt thường đến từ câu hỏi dữ liệu tốt.

Nguồn tham khảo chính
- pandas visualization guide.
- Matplotlib/Seaborn tutorials.
- UCI Student Performance Dataset documentation.`
  },
  {
    id: 4,
    order: 4,
    title: "Machine Learning với Scikit-learn",
    description: "Xây pipeline ML có train/test split, preprocessing, model và metrics.",
    content: `Mục tiêu chương
- Phân biệt feature, target, regression và classification.
- Dùng train_test_split, ColumnTransformer, Pipeline.
- Huấn luyện Linear Regression, Random Forest và đánh giá bằng MAE, RMSE, R².

Vì sao cần học kỹ?
Sinh viên mới thường mắc lỗi train/test leakage hoặc preprocessing sai thứ tự. Pipeline của scikit-learn giúp giảm lỗi và làm project dễ deploy hơn.

Nguồn tham khảo chính
- scikit-learn User Guide: preprocessing, model selection, metrics, pipeline.`
  },
  {
    id: 5,
    order: 5,
    title: "FastAPI Backend",
    description: "Đóng gói model thành API dự báo có validation dữ liệu.",
    content: `Mục tiêu chương
- Tạo FastAPI app, endpoint POST /predict và Pydantic schema.
- Load model đã lưu bằng joblib.
- Trả JSON response rõ ràng, xử lý input lỗi và test API bằng docs UI.

Vì sao cần học kỹ?
Project ML chỉ thật sự hữu ích khi người khác có thể gửi input và nhận prediction. API là cầu nối giữa model và sản phẩm.

Nguồn tham khảo chính
- FastAPI Tutorial - User Guide: request body, response model, validation, SQL databases.`
  },
  {
    id: 6,
    order: 6,
    title: "Streamlit Frontend & Deployment",
    description: "Tạo giao diện demo, báo cáo kết quả và chuẩn bị triển khai.",
    content: `Mục tiêu chương
- Xây form nhập dữ liệu học sinh bằng Streamlit.
- Gọi API dự báo, hiển thị prediction và cảnh báo đơn giản.
- Viết README, requirements, hướng dẫn chạy và chuẩn bị demo cuối khóa.

Vì sao cần học kỹ?
Một project tốt cần có cách trình bày. Streamlit giúp sinh viên biến notebook/model thành sản phẩm demo nhanh.

Nguồn tham khảo chính
- Streamlit tutorials: elements, execution flow, multipage apps, deployment.
- Vercel docs: deploy Vite frontend và cấu hình environment variables.`
  },
];

export const lessons: Lesson[] = [
  {
    id: 1,
    chapterId: 1,
    order: 1,
    title: "Biến, kiểu dữ liệu và cấu trúc dữ liệu",
    description: "Ôn lại str, int, float, bool, list, tuple, dict và set qua dữ liệu học sinh.",
    content: `Lý thuyết cần nắm
- list dùng khi cần lưu nhiều giá trị cùng loại hoặc có thứ tự, ví dụ danh sách điểm.
- dict dùng khi cần mô tả một thực thể bằng cặp key-value, ví dụ một học sinh.
- set dùng khi cần loại trùng, ví dụ danh sách lớp duy nhất.
- tuple dùng cho dữ liệu ít thay đổi, ví dụ tọa độ hoặc cặp giá trị.

Sai lầm thường gặp
- Dùng nhiều list rời rạc thay vì một list các dict, làm dữ liệu dễ lệch hàng.
- Đặt tên biến quá chung như data, x, temp khiến pipeline khó đọc.
- Không kiểm tra kiểu dữ liệu trước khi tính toán.

Bài tập
1. Tạo danh sách 5 học sinh, mỗi học sinh có name, gender, study_hours, attendance, previous_score, final_score.
2. Viết vòng lặp in ra học sinh có attendance dưới 75.
3. Tạo set chứa các lớp xuất hiện trong dữ liệu.

Project milestone
Tạo file students_raw.py chứa dữ liệu mẫu dạng list[dict].`,
    codeSnippet: `students = [
    {"name": "An", "class": "A", "study_hours": 10, "attendance": 92, "previous_score": 78, "final_score": 84},
    {"name": "Binh", "class": "B", "study_hours": 6, "attendance": 70, "previous_score": 65, "final_score": 68},
    {"name": "Chi", "class": "A", "study_hours": 14, "attendance": 96, "previous_score": 88, "final_score": 91},
]

for student in students:
    if student["attendance"] < 75:
        print(student["name"], "cần cải thiện điểm danh")`,
    codeExplanation: `Dòng 1-5: Biểu diễn dữ liệu học sinh bằng list các dict.
Dòng 7-9: Duyệt từng học sinh và kiểm tra điều kiện attendance.`
  },
  {
    id: 2,
    chapterId: 1,
    order: 2,
    title: "Hàm, kiểm tra dữ liệu và xử lý lỗi",
    description: "Viết hàm nhỏ, rõ trách nhiệm và biết raise exception khi dữ liệu sai.",
    content: `Lý thuyết cần nắm
- Hàm nên làm một việc rõ ràng: tính trung bình, kiểm tra điểm hợp lệ, chuẩn hóa tên cột.
- Exception không chỉ để chương trình khỏi crash; nó giúp báo lỗi đúng ngữ cảnh.
- Type hint giúp code dễ đọc và hỗ trợ autocomplete.

Sai lầm thường gặp
- Hàm vừa đọc file, vừa xử lý, vừa in kết quả, làm khó test.
- Im lặng bỏ qua lỗi dữ liệu, khiến model học trên dữ liệu sai.

Bài tập
1. Viết hàm validate_score(score) kiểm tra score nằm trong [0, 100].
2. Viết hàm calculate_average(scores) trả về trung bình.
3. Thử truyền danh sách rỗng và xử lý ValueError.

Project milestone
Tạo module validators.py để tái sử dụng ở bước API.`,
    codeSnippet: `def validate_score(score: float) -> float:
    if score < 0 or score > 100:
        raise ValueError("Điểm phải nằm trong khoảng 0 đến 100")
    return score

def calculate_average(scores: list[float]) -> float:
    if not scores:
        raise ValueError("Danh sách điểm không được trống")
    return sum(scores) / len(scores)

print(calculate_average([78, 84, 91]))`,
    codeExplanation: `Dòng 1-4: Kiểm tra một điểm có hợp lệ không.
Dòng 6-9: Tính trung bình nhưng chặn trường hợp danh sách rỗng.
Dòng 11: Gọi hàm với dữ liệu hợp lệ.`
  },
  {
    id: 3,
    chapterId: 1,
    order: 3,
    title: "Đọc ghi CSV và tổ chức project",
    description: "Dùng pathlib, csv và cấu trúc thư mục để chuẩn bị dữ liệu cho Pandas.",
    content: `Lý thuyết cần nắm
- CSV là định dạng bảng đơn giản, dễ chia sẻ giữa Python, Excel và Pandas.
- pathlib giúp xử lý đường dẫn ổn định hơn nối chuỗi thủ công.
- Project nên có data/, notebooks/, src/, models/, reports/.

Bài tập
1. Ghi list học sinh ra data/students_sample.csv.
2. Đọc lại file CSV và in 3 dòng đầu.
3. Tạo README mô tả từng cột.

Project milestone
Chuẩn bị thư mục project_ml/ và file data/students.csv.`,
    codeSnippet: `import csv
from pathlib import Path

DATA_DIR = Path("data")
DATA_DIR.mkdir(exist_ok=True)

with open(DATA_DIR / "students_sample.csv", "w", newline="", encoding="utf-8") as file:
    writer = csv.DictWriter(file, fieldnames=["name", "class", "study_hours", "attendance", "previous_score", "final_score"])
    writer.writeheader()
    writer.writerow({"name": "An", "class": "A", "study_hours": 10, "attendance": 92, "previous_score": 78, "final_score": 84})`,
    codeExplanation: `Dòng 1-2: Import công cụ làm việc với CSV và đường dẫn.
Dòng 4-5: Tạo thư mục data nếu chưa có.
Dòng 7-10: Ghi dữ liệu dạng dict ra CSV.`
  },
  {
    id: 4,
    chapterId: 1,
    order: 4,
    title: "Môi trường ảo và dependency",
    description: "Tạo virtual environment, cài thư viện và lưu requirements.",
    content: `Lý thuyết cần nắm
- Môi trường ảo giúp mỗi project có bộ thư viện riêng.
- requirements.txt giúp người khác cài đúng thư viện.
- Với project ML, nên cố định phiên bản ở giai đoạn bàn giao.

Bài tập
1. Tạo venv và cài pandas, matplotlib, seaborn, scikit-learn, joblib, fastapi, streamlit.
2. Xuất requirements.txt.
3. Viết hướng dẫn chạy trong README.

Project milestone
Môi trường chạy được notebook, training script, FastAPI và Streamlit.`,
    codeSnippet: `python -m venv .venv
.venv\\Scripts\\activate
pip install pandas matplotlib seaborn scikit-learn joblib fastapi streamlit uvicorn
pip freeze > requirements.txt`,
    codeExplanation: `Dòng 1: Tạo môi trường ảo.
Dòng 2: Kích hoạt môi trường trên Windows.
Dòng 3: Cài thư viện cần cho toàn bộ project.
Dòng 4: Ghi dependency ra requirements.txt.`
  },
  {
    id: 5,
    chapterId: 2,
    order: 1,
    title: "Series, DataFrame và đọc dữ liệu",
    description: "Hiểu DataFrame, dtype, shape, head, info và describe.",
    content: `Lý thuyết cần nắm
- Series là một cột có nhãn; DataFrame là bảng gồm nhiều Series.
- dtype sai có thể làm model lỗi hoặc tính toán sai.
- df.info(), df.describe(), df.head() là bộ kiểm tra đầu tiên khi nhận dữ liệu mới.

Bài tập
1. Đọc students.csv bằng Pandas.
2. In shape, dtypes và số giá trị thiếu mỗi cột.
3. Viết 5 nhận xét đầu tiên về dữ liệu.

Project milestone
Notebook 01_load_and_inspect.ipynb.`,
    codeSnippet: `import pandas as pd

df = pd.read_csv("data/students.csv")
print(df.shape)
print(df.head())
print(df.info())
print(df.describe(numeric_only=True))`,
    codeExplanation: `Dòng 1: Import pandas.
Dòng 3: Đọc CSV thành DataFrame.
Dòng 4-7: Kiểm tra kích thước, vài dòng đầu, kiểu dữ liệu và thống kê.`
  },
  {
    id: 6,
    chapterId: 2,
    order: 2,
    title: "Làm sạch dữ liệu thiếu, trùng và sai kiểu",
    description: "Xử lý missing values, duplicates, rename columns và astype.",
    content: `Lý thuyết cần nắm
- Không có một cách xử lý missing value đúng cho mọi trường hợp.
- Với dữ liệu điểm số, median thường ổn hơn mean nếu có ngoại lệ.
- Không nên drop cột/dòng trước khi hiểu vì sao dữ liệu bị thiếu.

Bài tập
1. Tính tỷ lệ missing của từng cột.
2. Điền study_hours bằng median, attendance bằng median.
3. Xóa dòng trùng lặp.
4. Chuẩn hóa tên cột sang snake_case.

Project milestone
Tạo data/students_clean.csv.`,
    codeSnippet: `df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")
df = df.drop_duplicates()
df["study_hours"] = df["study_hours"].fillna(df["study_hours"].median())
df["attendance"] = df["attendance"].fillna(df["attendance"].median())
df.to_csv("data/students_clean.csv", index=False)`,
    codeExplanation: `Dòng 1: Chuẩn hóa tên cột.
Dòng 2: Xóa bản ghi trùng.
Dòng 3-4: Điền giá trị thiếu bằng median.
Dòng 5: Lưu dữ liệu sạch.`
  },
  {
    id: 7,
    chapterId: 2,
    order: 3,
    title: "Lọc, groupby và feature engineering",
    description: "Tạo bảng thống kê và feature mới từ dữ liệu hiện có.",
    content: `Lý thuyết cần nắm
- groupby theo tư duy split-apply-combine: chia nhóm, áp dụng phép tính, ghép kết quả.
- Feature engineering là tạo biến đầu vào có ý nghĩa hơn cho model.
- Feature tốt cần có logic miền dữ liệu, không chỉ biến đổi máy móc.

Bài tập
1. Tính final_score trung bình theo class.
2. Tạo feature study_efficiency = previous_score / max(study_hours, 1).
3. Tạo cột risk_level dựa trên attendance và previous_score.

Project milestone
Tạo data/students_features.csv.`,
    codeSnippet: `class_summary = df.groupby("class")["final_score"].agg(["mean", "std", "count"])
df["study_efficiency"] = df["previous_score"] / df["study_hours"].clip(lower=1)
df["risk_level"] = df.apply(
    lambda row: "high" if row["attendance"] < 75 and row["previous_score"] < 60 else "normal",
    axis=1,
)`,
    codeExplanation: `Dòng 1: Tạo thống kê theo lớp.
Dòng 2: Tạo feature mới nhưng tránh chia cho 0 bằng clip.
Dòng 3-6: Tạo nhãn risk_level từ nhiều điều kiện.`
  },
  {
    id: 8,
    chapterId: 2,
    order: 4,
    title: "Mini assessment Pandas",
    description: "Hoàn thành một notebook xử lý dữ liệu từ raw đến clean.",
    content: `Yêu cầu hoàn thành
- Notebook chạy từ đầu đến cuối không lỗi.
- Có ít nhất 5 kiểm tra dữ liệu: shape, dtypes, missing, duplicate, describe.
- Có ít nhất 3 feature mới có giải thích.
- Lưu được file clean/features.

Rubric
- 40% đúng thao tác Pandas.
- 30% nhận xét dữ liệu có ý nghĩa.
- 20% code sạch, tên biến rõ.
- 10% file output đúng cấu trúc.`,
    codeSnippet: `checks = {
    "shape": df.shape,
    "missing": df.isna().sum().to_dict(),
    "duplicates": int(df.duplicated().sum()),
}
print(checks)`,
    codeExplanation: `Đây là mẫu gom các kiểm tra dữ liệu vào một dict để báo cáo rõ ràng.`
  },
  {
    id: 9,
    chapterId: 3,
    order: 1,
    title: "Thống kê mô tả và câu hỏi EDA",
    description: "Biến dữ liệu thành câu hỏi trước khi vẽ biểu đồ.",
    content: `Lý thuyết cần nắm
- EDA bắt đầu bằng câu hỏi: điểm phân phối ra sao, nhóm nào yếu, feature nào liên quan target.
- Mean dễ bị ảnh hưởng bởi outlier; median thường ổn định hơn.
- Không nên kết luận nhân quả chỉ từ tương quan.

Bài tập
1. Viết 8 câu hỏi EDA cho dữ liệu học sinh.
2. Tính mean, median, std của final_score.
3. So sánh final_score theo class và gender.

Project milestone
Tạo section "EDA Questions" trong notebook.`,
    codeSnippet: `questions = [
    "Điểm cuối kỳ phân phối như thế nào?",
    "Giờ học có liên quan tới điểm cuối kỳ không?",
    "Attendance thấp có làm tăng rủi ro điểm thấp không?",
]
print(df["final_score"].agg(["mean", "median", "std", "min", "max"]))`,
    codeExplanation: `Dòng 1-5: Ghi rõ câu hỏi EDA.
Dòng 6: Tính thống kê mô tả của target.`
  },
  {
    id: 10,
    chapterId: 3,
    order: 2,
    title: "Histogram, boxplot và outlier",
    description: "Nhìn phân phối điểm và phát hiện ngoại lệ.",
    content: `Lý thuyết cần nắm
- Histogram cho biết phân phối lệch trái/phải, nhiều đỉnh hay tập trung.
- Boxplot giúp thấy median, IQR và outlier.
- Outlier không phải lúc nào cũng xấu; cần kiểm tra nguồn dữ liệu.

Bài tập
1. Vẽ histogram của final_score.
2. Vẽ boxplot final_score theo class.
3. Liệt kê các học sinh có final_score rất thấp nhưng study_hours cao.

Project milestone
Lưu ít nhất 2 biểu đồ vào reports/figures.`,
    codeSnippet: `import seaborn as sns
import matplotlib.pyplot as plt

sns.histplot(data=df, x="final_score", bins=20, kde=True)
plt.title("Phân phối điểm cuối kỳ")
plt.show()

sns.boxplot(data=df, x="class", y="final_score")
plt.title("Điểm cuối kỳ theo lớp")
plt.show()`,
    codeExplanation: `Dòng 1-2: Import thư viện vẽ.
Dòng 4-6: Histogram của target.
Dòng 8-10: Boxplot so sánh theo lớp.`
  },
  {
    id: 11,
    chapterId: 3,
    order: 3,
    title: "Scatter, correlation và heatmap",
    description: "Đọc quan hệ giữa feature số và target.",
    content: `Lý thuyết cần nắm
- Scatter plot giúp thấy xu hướng, cụm điểm và ngoại lệ.
- Correlation gần 1 hoặc -1 cho thấy quan hệ tuyến tính mạnh, nhưng không chứng minh nhân quả.
- Heatmap giúp ưu tiên feature để thử trong model đầu tiên.

Bài tập
1. Vẽ scatter study_hours vs final_score.
2. Vẽ heatmap correlation cho các cột số.
3. Viết 3 insight có thể kiểm chứng bằng model.

Project milestone
Chọn feature list phiên bản 1.`,
    codeSnippet: `sns.scatterplot(data=df, x="study_hours", y="final_score", hue="risk_level")
plt.title("Giờ học và điểm cuối kỳ")
plt.show()

corr = df.corr(numeric_only=True)
sns.heatmap(corr, annot=True, cmap="coolwarm", vmin=-1, vmax=1)
plt.title("Ma trận tương quan")
plt.show()`,
    codeExplanation: `Dòng 1-3: Vẽ quan hệ giữa giờ học và điểm.
Dòng 5-8: Tính và vẽ ma trận tương quan.`
  },
  {
    id: 12,
    chapterId: 3,
    order: 4,
    title: "EDA report ngắn",
    description: "Viết báo cáo insight trước khi train model.",
    content: `Yêu cầu hoàn thành
- Có ít nhất 5 biểu đồ.
- Mỗi biểu đồ có tiêu đề và nhận xét 2-4 câu.
- Có danh sách feature dự kiến dùng cho model và lý do.
- Có cảnh báo về bias/leakage nếu có.

Project milestone
Tạo reports/eda_summary.md để dùng trong báo cáo cuối khóa.`,
    codeSnippet: `eda_findings = [
    "study_hours có xu hướng tăng cùng final_score.",
    "attendance thấp thường đi kèm nhóm điểm thấp.",
    "previous_score là feature mạnh nhưng cần tránh dùng dữ liệu phát sinh sau kỳ học.",
]
for finding in eda_findings:
    print("-", finding)`,
    codeExplanation: `Mẫu ghi insight thành danh sách rõ ràng, dễ đưa vào báo cáo.`
  },
  {
    id: 13,
    chapterId: 4,
    order: 1,
    title: "Feature, target, train/test split",
    description: "Thiết lập bài toán regression đúng cách.",
    content: `Lý thuyết cần nắm
- Target là biến cần dự báo, ở project này là final_score.
- Feature là thông tin có sẵn trước khi dự báo.
- Train/test split giúp đo khả năng tổng quát hóa.
- Không đưa feature rò rỉ target vào model.

Bài tập
1. Chọn X và y.
2. Chia train/test với random_state cố định.
3. In kích thước từng tập.

Project milestone
Notebook 03_train_baseline.ipynb.`,
    codeSnippet: `from sklearn.model_selection import train_test_split

features = ["study_hours", "attendance", "previous_score", "class", "gender"]
target = "final_score"

X = df[features]
y = df[target]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)`,
    codeExplanation: `Dòng 1: Import hàm chia dữ liệu.
Dòng 3-7: Tách feature và target.
Dòng 9: Chia train/test để đánh giá công bằng hơn.`
  },
  {
    id: 14,
    chapterId: 4,
    order: 2,
    title: "Preprocessing bằng ColumnTransformer",
    description: "Xử lý feature số và category trong cùng pipeline.",
    content: `Lý thuyết cần nắm
- Feature số thường cần impute/scale tùy model.
- Feature category cần encoding, phổ biến là OneHotEncoder.
- ColumnTransformer giúp áp dụng biến đổi khác nhau cho từng nhóm cột.

Bài tập
1. Tạo numeric_features và categorical_features.
2. Tạo ColumnTransformer.
3. Giải thích vì sao fit preprocessing chỉ trên train.

Project milestone
Pipeline preprocessing chạy được.`,
    codeSnippet: `from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline

numeric_features = ["study_hours", "attendance", "previous_score"]
categorical_features = ["class", "gender"]

numeric_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler()),
])

preprocessor = ColumnTransformer([
    ("num", numeric_pipeline, numeric_features),
    ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features),
])`,
    codeExplanation: `Dòng 1-4: Import công cụ pipeline.
Dòng 6-7: Tách cột số và cột phân loại.
Dòng 9-12: Pipeline xử lý cột số.
Dòng 14-17: ColumnTransformer kết hợp xử lý số và category.`
  },
  {
    id: 15,
    chapterId: 4,
    order: 3,
    title: "Baseline, Random Forest và metrics",
    description: "Huấn luyện model và đánh giá bằng MAE, RMSE, R².",
    content: `Lý thuyết cần nắm
- Baseline giúp biết model phức tạp có thật sự tốt hơn dự đoán đơn giản không.
- MAE dễ hiểu: trung bình model lệch bao nhiêu điểm.
- RMSE phạt lỗi lớn mạnh hơn.
- R² cho biết model giải thích được bao nhiêu phương sai của target.

Bài tập
1. Tạo baseline dự đoán mean của y_train.
2. Train RandomForestRegressor.
3. So sánh MAE baseline và model.

Project milestone
Chọn model phiên bản 1 để lưu.`,
    codeSnippet: `from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.pipeline import Pipeline

model = Pipeline([
    ("preprocess", preprocessor),
    ("regressor", RandomForestRegressor(n_estimators=200, random_state=42)),
])

model.fit(X_train, y_train)
y_pred = model.predict(X_test)

mae = mean_absolute_error(y_test, y_pred)
rmse = mean_squared_error(y_test, y_pred, squared=False)
r2 = r2_score(y_test, y_pred)
print({"MAE": mae, "RMSE": rmse, "R2": r2})`,
    codeExplanation: `Dòng 1-3: Import model, metrics và Pipeline.
Dòng 5-8: Ghép preprocessing và Random Forest.
Dòng 10-11: Train và dự báo.
Dòng 13-16: Tính các metric chính.`
  },
  {
    id: 16,
    chapterId: 4,
    order: 4,
    title: "Lưu model và kiểm thử prediction",
    description: "Dùng joblib để lưu pipeline hoàn chỉnh.",
    content: `Lý thuyết cần nắm
- Nên lưu cả preprocessing + model trong cùng Pipeline.
- Khi deploy, input mới phải đi qua đúng preprocessing đã fit.
- Cần test prediction với một sample giả lập trước khi viết API.

Bài tập
1. Lưu model bằng joblib.dump.
2. Load lại model.
3. Predict một học sinh mới.

Project milestone
Tạo models/student_success_model.joblib.`,
    codeSnippet: `import joblib
import pandas as pd

joblib.dump(model, "models/student_success_model.joblib")
loaded_model = joblib.load("models/student_success_model.joblib")

sample = pd.DataFrame([{
    "study_hours": 12,
    "attendance": 90,
    "previous_score": 75,
    "class": "A",
    "gender": "F",
}])
print(loaded_model.predict(sample)[0])`,
    codeExplanation: `Dòng 1-2: Import joblib và pandas.
Dòng 4-5: Lưu và load lại pipeline.
Dòng 7-14: Tạo sample đúng schema và dự báo.`
  },
  {
    id: 17,
    chapterId: 5,
    order: 1,
    title: "FastAPI app và Pydantic schema",
    description: "Tạo endpoint nhận dữ liệu học sinh có validation.",
    content: `Lý thuyết cần nắm
- FastAPI dùng type hint và Pydantic để validate request body.
- Schema rõ giúp frontend biết phải gửi field nào.
- Endpoint POST phù hợp cho prediction vì input nằm trong request body.

Bài tập
1. Tạo app FastAPI.
2. Tạo StudentInput model.
3. Tạo endpoint /health và /predict trả kết quả mẫu.

Project milestone
api/main.py chạy được ở localhost:8000/docs.`,
    codeSnippet: `from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(title="Student Success Predictor API")

class StudentInput(BaseModel):
    study_hours: float = Field(ge=0, le=40)
    attendance: float = Field(ge=0, le=100)
    previous_score: float = Field(ge=0, le=100)
    class_name: str
    gender: str

@app.get("/health")
def health():
    return {"status": "ok"}`,
    codeExplanation: `Dòng 1-2: Import FastAPI và Pydantic.
Dòng 4: Tạo app.
Dòng 6-11: Schema input có ràng buộc giá trị.
Dòng 13-15: Endpoint kiểm tra API sống.`
  },
  {
    id: 18,
    chapterId: 5,
    order: 2,
    title: "Load model và predict",
    description: "Tích hợp model joblib vào endpoint /predict.",
    content: `Lý thuyết cần nắm
- API nhận JSON, chuyển thành DataFrame đúng schema rồi gọi model.predict.
- Response nên có prediction và metadata đơn giản như unit hoặc model_version.
- Không nên train model trong request handler.

Bài tập
1. Load model khi app khởi động.
2. Viết endpoint /predict.
3. Test bằng Swagger UI.

Project milestone
API trả prediction thật.`,
    codeSnippet: `import joblib
import pandas as pd

model = joblib.load("models/student_success_model.joblib")

@app.post("/predict")
def predict(payload: StudentInput):
    row = pd.DataFrame([{
        "study_hours": payload.study_hours,
        "attendance": payload.attendance,
        "previous_score": payload.previous_score,
        "class": payload.class_name,
        "gender": payload.gender,
    }])
    prediction = float(model.predict(row)[0])
    return {"predicted_final_score": round(prediction, 2), "model_version": "v1"}`,
    codeExplanation: `Dòng 1-4: Load model đã train.
Dòng 6-14: Chuyển payload thành DataFrame đúng tên cột.
Dòng 15-16: Dự báo và trả JSON.`
  },
  {
    id: 19,
    chapterId: 5,
    order: 3,
    title: "Test API và xử lý lỗi",
    description: "Kiểm tra input hợp lệ, input sai và response code.",
    content: `Lý thuyết cần nắm
- Validation lỗi nên trả thông báo rõ để frontend sửa input.
- Test API bằng docs UI, curl hoặc requests.
- Nên có endpoint /health cho deploy monitoring.

Bài tập
1. Gửi input hợp lệ.
2. Gửi attendance = 150 và đọc lỗi validation.
3. Viết script test_predict.py dùng requests.

Project milestone
API có test case tối thiểu.`,
    codeSnippet: `import requests

payload = {
    "study_hours": 12,
    "attendance": 90,
    "previous_score": 75,
    "class_name": "A",
    "gender": "F",
}

response = requests.post("http://127.0.0.1:8000/predict", json=payload)
print(response.status_code)
print(response.json())`,
    codeExplanation: `Script gửi POST request tới API và in status code + JSON để kiểm tra nhanh.`
  },
  {
    id: 20,
    chapterId: 5,
    order: 4,
    title: "CORS, cấu hình và chuẩn bị deploy API",
    description: "Cho phép frontend gọi API và tách cấu hình bằng env.",
    content: `Lý thuyết cần nắm
- CORS kiểm soát domain nào được gọi API từ browser.
- Config nên nằm trong environment variables, không hard-code.
- Khi deploy riêng frontend/backend, URL API phải cấu hình được.

Bài tập
1. Thêm CORSMiddleware.
2. Đọc MODEL_PATH từ environment variable.
3. Viết README hướng dẫn chạy API.

Project milestone
API sẵn sàng chạy local và deploy riêng nếu cần.`,
    codeSnippet: `from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8501", "http://127.0.0.1:8501"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)`,
    codeExplanation: `Đoạn này cho phép Streamlit local gọi FastAPI local trong giai đoạn phát triển.`
  },
  {
    id: 21,
    chapterId: 6,
    order: 1,
    title: "Streamlit form nhập dữ liệu",
    description: "Tạo UI nhập feature và gọi API dự báo.",
    content: `Lý thuyết cần nắm
- Streamlit chạy lại script từ đầu mỗi khi widget thay đổi.
- Widget nên có min/max hợp lý để giảm input sai.
- Frontend không nên chứa logic ML phức tạp; nó gọi API.

Bài tập
1. Tạo slider study_hours, attendance, previous_score.
2. Tạo selectbox class và gender.
3. Khi bấm nút, gọi API /predict.

Project milestone
streamlit_app.py hiển thị prediction.`,
    codeSnippet: `import streamlit as st
import requests

st.title("Student Success Predictor")

study_hours = st.slider("Giờ học mỗi tuần", 0, 40, 10)
attendance = st.slider("Tỷ lệ điểm danh (%)", 0, 100, 85)
previous_score = st.slider("Điểm trước đó", 0, 100, 75)
class_name = st.selectbox("Lớp", ["A", "B", "C"])
gender = st.selectbox("Giới tính", ["F", "M"])

if st.button("Dự báo"):
    payload = {
        "study_hours": study_hours,
        "attendance": attendance,
        "previous_score": previous_score,
        "class_name": class_name,
        "gender": gender,
    }
    response = requests.post("http://127.0.0.1:8000/predict", json=payload)
    st.success(f"Dự báo điểm cuối kỳ: {response.json()['predicted_final_score']}")`,
    codeExplanation: `Dòng 1-4: Khởi tạo app.
Dòng 6-10: Tạo input.
Dòng 12-21: Gửi request và hiển thị kết quả.`
  },
  {
    id: 22,
    chapterId: 6,
    order: 2,
    title: "Hiển thị insight và cảnh báo",
    description: "Giúp người dùng hiểu prediction thay vì chỉ thấy một con số.",
    content: `Lý thuyết cần nắm
- Prediction cần được diễn giải cẩn thận, không nên coi là kết luận tuyệt đối.
- UI nên hiển thị input summary và cảnh báo nếu attendance thấp.
- Có thể thêm biểu đồ nhỏ để giải thích xu hướng.

Bài tập
1. Hiển thị metric cho từng input.
2. Nếu attendance < 75, hiện warning.
3. Nếu prediction < 60, gợi ý kế hoạch cải thiện.

Project milestone
Demo có trải nghiệm người dùng tốt hơn.`,
    codeSnippet: `st.subheader("Tóm tắt đầu vào")
col1, col2, col3 = st.columns(3)
col1.metric("Giờ học/tuần", study_hours)
col2.metric("Điểm danh", f"{attendance}%")
col3.metric("Điểm trước đó", previous_score)

if attendance < 75:
    st.warning("Điểm danh thấp có thể làm tăng rủi ro kết quả thấp.")`,
    codeExplanation: `Dòng 1-5: Hiển thị input bằng metric.
Dòng 7-8: Cảnh báo đơn giản dựa trên rule dễ hiểu.`
  },
  {
    id: 23,
    chapterId: 6,
    order: 3,
    title: "Báo cáo cuối khóa",
    description: "Viết README, mô tả dữ liệu, metrics và giới hạn của model.",
    content: `Lý thuyết cần nắm
- Báo cáo ML cần có dữ liệu, phương pháp, kết quả, giới hạn và hướng cải thiện.
- Không nên chỉ khoe accuracy/metric; cần giải thích model dùng được trong bối cảnh nào.
- Với dữ liệu giáo dục, cần nhắc tới bias và privacy.

Bài tập
1. Viết README có hướng dẫn setup.
2. Thêm bảng mô tả cột dữ liệu.
3. Ghi metric model và ảnh chụp demo.

Project milestone
README đủ để người khác chạy project.`,
    codeSnippet: `# Student Success Predictor

## How to run
1. pip install -r requirements.txt
2. uvicorn api.main:app --reload
3. streamlit run streamlit_app.py

## Model
- Target: final_score
- Metrics: MAE, RMSE, R²`,
    codeExplanation: `Mẫu README tối thiểu cho project cuối khóa.`
  },
  {
    id: 24,
    chapterId: 6,
    order: 4,
    title: "Checklist demo và triển khai",
    description: "Chuẩn bị bản demo chạy ổn định trong buổi bảo vệ.",
    content: `Yêu cầu hoàn thành
- Notebook chạy từ đầu đến cuối.
- Model được lưu trong models/.
- FastAPI chạy được và có /docs.
- Streamlit gọi API thành công.
- README có hướng dẫn cài đặt.
- Có phần giới hạn đạo đức: dữ liệu nhỏ, không dùng prediction để quyết định thật về sinh viên.

Project milestone
Nộp link repository, link demo và báo cáo PDF.`,
    codeSnippet: `# Demo checklist
python -m pytest tests
uvicorn api.main:app --reload
streamlit run streamlit_app.py`,
    codeExplanation: `Checklist lệnh để kiểm tra project trước ngày demo.`
  },
];

export const cheatSheets: CheatSheet[] = [
  {
    id: 1,
    title: "Python Project Checklist",
    category: "Python",
    searchKeywords: "python function exception venv csv",
    content: `1. Tạo .venv và requirements.txt
2. Tách hàm nhỏ, có tên rõ
3. Validate input quan trọng
4. Dùng pathlib cho đường dẫn
5. Không hard-code file path production`
  },
  {
    id: 2,
    title: "Pandas Data Cleaning",
    category: "Pandas",
    searchKeywords: "pandas dataframe missing duplicate groupby",
    content: `df.head()
df.info()
df.describe(numeric_only=True)
df.isna().sum()
df.duplicated().sum()
df.drop_duplicates()
df.fillna(df.median(numeric_only=True))
df.groupby("class")["final_score"].mean()`
  },
  {
    id: 3,
    title: "Scikit-learn Pipeline",
    category: "Scikit-learn",
    searchKeywords: "sklearn pipeline train test metrics",
    content: `from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

Pipeline([
  ("preprocess", preprocessor),
  ("model", estimator),
])`
  },
  {
    id: 4,
    title: "FastAPI Predict Endpoint",
    category: "FastAPI",
    searchKeywords: "fastapi pydantic predict endpoint",
    content: `class StudentInput(BaseModel):
    study_hours: float
    attendance: float
    previous_score: float

@app.post("/predict")
def predict(payload: StudentInput):
    return {"prediction": 85.5}`
  },
  {
    id: 5,
    title: "Streamlit Demo",
    category: "Streamlit",
    searchKeywords: "streamlit slider requests metric",
    content: `st.slider("Giờ học", 0, 40, 10)
st.selectbox("Lớp", ["A", "B", "C"])
st.metric("Prediction", prediction)
st.warning("Cảnh báo nếu input có rủi ro")`
  },
];
