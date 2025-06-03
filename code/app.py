import streamlit as st
import pandas as pd
import numpy as np
import pickle

# --- Load Model ---
with open("car_price_model_target_encoded.pkl", "rb") as f:
    model = pickle.load(f)

# --- Load Data for Encoding ---
df =pd.read_csv('quikr_car.csv')
df = df[df['Price'] != 'Ask For Price']
df['Price'] = df['Price'].astype(str).str.replace(',', '').astype(int)
df = df[df['kms_driven'].notna()]
df['kms_driven'] = df['kms_driven'].astype(str).str.replace(' kms', '').str.replace(',', '')
df = df[df['kms_driven'].apply(lambda x: x.isdigit())]
df['kms_driven'] = df['kms_driven'].astype(int)
df['name'] = df['name'].astype(str).str.split().str.slice(0, 3).str.join(' ')
df = df.dropna().reset_index(drop=True)
df = df[df['Price'] < 1000000]
df = df[df['kms_driven'] < 300000]

top_names = df['name'].value_counts().nlargest(30).index
df['name'] = df['name'].apply(lambda x: x if x in top_names else 'other')

top_companies = df['company'].value_counts().nlargest(15).index
df['company'] = df['company'].apply(lambda x: x if x in top_companies else 'other')

# --- Target Encoding Maps ---
name_map = df.groupby('name')['Price'].mean().to_dict()
company_map = df.groupby('company')['Price'].mean().to_dict()
fuel_map = df.groupby('fuel_type')['Price'].mean().to_dict()

# --- Streamlit UI ---
st.title("🚗 Car Price Predictor")

# User Input
name = st.selectbox("Select Car Name", sorted(top_names.tolist()) + ['other'])
company = st.selectbox("Select Company", sorted(top_companies.tolist()) + ['other'])
year = st.slider("Car Manufacturing Year", 1995, 2025, 2015)
kms_driven = st.number_input("KMs Driven", 0, 300000, 50000)
fuel = st.selectbox("Fuel Type", df['fuel_type'].unique())

# Predict button
if st.button("Predict Price"):

    # Handle unseen categories
    name_encoded = name_map.get(name, np.mean(list(name_map.values())))
    company_encoded = company_map.get(company, np.mean(list(company_map.values())))
    fuel_encoded = fuel_map.get(fuel, np.mean(list(fuel_map.values())))

    input_df = pd.DataFrame([[year, kms_driven, name_encoded, company_encoded, fuel_encoded]],
                            columns=['year', 'kms_driven', 'name_encoded', 'company_encoded', 'fuel_encoded'])

    prediction = model.predict(input_df)[0]

    st.success(f"💰 Estimated Price: ₹{int(prediction):,}")
