## Car Price Prediction using Linear Regression:

This project is a web-based application for predicting the resale price of used cars using a Linear Regression model. Built with Streamlit, it allows users to input car details and receive real-time predictions of expected prices.

## Features:

Predicts car resale prices based on key inputs like brand, model, fuel type, year, and kilometers driven.

Simple, interactive web UI created with Streamlit.

Uses Target Encoding to convert categorical features into meaningful numeric representations.

Clean preprocessing pipeline for data handling.

Trained using scikit-learn's Linear Regression algorithm.

Model persistence using .pkl format for easy loading and reuse.

Includes visualizations to explore dataset trends and feature impact.

## How to Run:

Clone the repository:

git clone https://github.com/yourusername/Car-Price-Prediction.git

cd Car-Price-Prediction

(Optional) Create and activate a virtual environment:

## Windows:

python -m venv venv

venv\Scripts\activate

## macOS/Linux:

python3 -m venv venv

source venv/bin/activate

## Install the required packages:

pip install -r requirements.txt

## Start the Streamlit app:

streamlit run app.py

## Model Overview:

Model: Linear Regression

Encoding: Target Encoding on categorical features (name, company, fuel_type)

Dataset: Cleaned version of Quikr car sales data

Output: Predicted car price in Indian Rupees (INR)

## Performance:

R² Score: ~0.56

RMSE: ~₹128,000

## Visualizations Included:

Car price distribution

Heatmap of feature correlations

Boxplots for price vs categorical features

Histograms and bar plots (optional)


### Required packages include:

streamlit

pandas

numpy

scikit-learn

seaborn

matplotlib

(Install all with pip install -r requirements.txt)

### Future Improvements:

Replace Linear Regression with more advanced models like XGBoost or Random Forest.

Add support for retraining the model with uploaded datasets.

Integrate model explainability using SHAP or LIME.

Deploy to Streamlit Cloud, Heroku, or Render.

Store prediction logs for review.

## License:

This project is licensed under the MIT License.

## Author:

Developed by Sathish B

GitHub: https://github.com/SathishB-1/Car-Price-Prediction

## User Interface:
![image Alt](https://github.com/SathishB-1/Car-Price-Prediction/blob/2867c3b7d984382920d5f48d77d4a861532370a2/image/UI.png)
