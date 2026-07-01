# Student Success Predictor Starter

Starter code cho sinh viên làm project cuối khóa.

## Cấu trúc

- `data/students.csv`: dataset mẫu.
- `train_model.py`: đọc dữ liệu, train scikit-learn Pipeline và lưu model.
- `api/main.py`: FastAPI endpoint `/predict`.
- `streamlit_app.py`: UI demo gọi API.
- `requirements.txt`: dependency Python.

## Chạy local

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python train_model.py
uvicorn api.main:app --reload
streamlit run streamlit_app.py
```
