import requests
import streamlit as st

API_URL = "http://127.0.0.1:8000/predict"

st.set_page_config(page_title="Student Success Predictor", page_icon="🎓")
st.title("Student Success Predictor")

gender = st.selectbox("Giới tính", ["F", "M"])
class_name = st.selectbox("Lớp", ["A", "B", "C"])
study_hours = st.slider("Giờ học mỗi tuần", 0, 40, 10)
attendance = st.slider("Tỷ lệ điểm danh (%)", 0, 100, 85)
previous_score = st.slider("Điểm trước đó", 0, 100, 75)
absences = st.slider("Số buổi vắng", 0, 100, 3)
parent_support = st.selectbox("Có hỗ trợ từ gia đình?", ["yes", "no"])
internet_access = st.selectbox("Có internet ở nhà?", ["yes", "no"])

if st.button("Dự báo điểm cuối kỳ"):
    payload = {
        "gender": gender,
        "class_name": class_name,
        "study_hours": study_hours,
        "attendance": attendance,
        "previous_score": previous_score,
        "absences": absences,
        "parent_support": parent_support,
        "internet_access": internet_access,
    }
    response = requests.post(API_URL, json=payload, timeout=10)
    response.raise_for_status()
    prediction = response.json()["predicted_final_score"]

    st.metric("Dự báo điểm cuối kỳ", prediction)
    if attendance < 75:
        st.warning("Điểm danh thấp có thể làm tăng rủi ro kết quả thấp.")
    if prediction < 60:
        st.error("Sinh viên có rủi ro không đạt. Nên tăng giờ học và cải thiện điểm danh.")
    else:
        st.success("Sinh viên đang ở mức tương đối ổn theo model demo.")
