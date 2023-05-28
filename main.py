import csv
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# reading the data
df = pd.read_csv("./data/CO2_emission_wrangled.csv")

# overview of the data
print(df.info())

# display the first 5 rows
print(df.head())

# statistical summary of numerical variables
print(df.describe())

# total co2 emission by year
print(df.groupby('Year')['CO2_emission'].sum())

grouped_data = df.groupby("Year")["CO2_emission"].sum()




# total co2 emission by country
print(df.groupby('Country_Name')['CO2_emission'].sum())


# average co2 emission by country
print(df.groupby("Country_Name")['CO2_emission'].mean())


# total co2 emission by region
print(df.groupby("Region")["CO2_emission"].mean())


# print out the unique regions
print("Unique Regions: ", df["Region"].nunique())

# get the number of unique countries in the dataset
print("Unique Countries: ", df["Country_Name"].nunique())


# create a plot

# plt.figure(figsize=(10, 6))
# plt.plot(grouped_data.index, grouped_data.values)
# plt.xlabel("Year")
# plt.ylabel("Total CO2 emission")
# plt.title("Total CO2 emission by year")
# plt.grid(True)
# # plt.show()

# basic prediction model

from keras.models import Sequential
from keras.layers import LSTM, Dense
import numpy as np





