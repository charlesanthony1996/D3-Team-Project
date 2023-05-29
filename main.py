import csv
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# reading the data
df = pd.read_csv("./data/CO2_emission_wrangled.csv")

# overview of the data
# print(df.info())

# display the first 5 rows
# print(df.head())

# statistical summary of numerical variables
# print(df.describe())

# total co2 emission by year
# print(df.groupby('Year')['CO2_emission'].sum())

grouped_data = df.groupby("Year")["CO2_emission"].sum()




# total co2 emission by country
# print(df.groupby('Country_Name')['CO2_emission'].sum())

grouped_data2 = df.groupby("Country_Name")["CO2_emission"].sum()


# average co2 emission by country
# print(df.groupby("Country_Name")['CO2_emission'].mean())


# grouped_data3 = df.groupby("Country_Name")["CO2_emission"].mean()

# total co2 emission by region
# print(df.groupby("Region")["CO2_emission"].mean())


# print out the unique regions
# print("Unique Regions: ", df["Region"].nunique())

# get the number of unique countries in the dataset
# print("Unique Countries: ", df["Country_Name"].nunique())

# total co2 emissions at a specific year -> at 1990 and 2019
total_emission_1990 = grouped_data.loc[1990]

total_emission_2019 = grouped_data.loc[2019]

print("total co2 emission for all countries in 1990: ", total_emission_1990)


print("total co2 emission for all countries in 2019: ", total_emission_2019)



# create a plot for the total co2 emissions by year by all countries

# plt.figure(figsize=(10, 6))
# plt.plot(grouped_data.index, grouped_data.values)
# plt.xlabel("Year")
# plt.ylabel("Total CO2 emissions")
# plt.title("Total CO2 emission by year")
# plt.grid(True)
# # plt.show()


# plot for total c02 emissions by country
# this is for the first 7 countries of the dataset
# plt.figure()
# plt.plot(grouped_data2.index[:7], grouped_data2.values[:7])
# plt.xlabel("Year")
# plt.ylabel("Total CO2 emissions")
# plt.title("Total CO2 emissions by country")
# plt.grid(True)
# plt.show()


# plot for total 




# basic prediction model

from keras.models import Sequential
from keras.layers import LSTM, Dense
import numpy as np


# first you would need to extract the data for austria and prepare it
df_austria = df[df["Country_Name"] == "Austria"]
data = df_austria["CO2_emission"].values


# then you would need to normalize your data, transform it to the appropriate shape, and split it into training
# and validation sets

# print(data)

# defining the model

model = Sequential()

model.add(LSTM(units = 50, return_sequences=True, input_shape= (None, 1)))
model.add(LSTM(units = 50))
model.add(Dense(units = 1))

model.compile(optimizer = "adam", loss="mean_squared_error")

# prepare the data
x = data[:-1]
y = data[1:]

# normalizing the data
x = (x - x.min()) / (x.max() - x.min())
y = (y - y.min()) / (y.max() - y.min())


# split the data into training and validation sets
train_size = int(len(x) * 0.8)
x_train, x_val = x[:train_size], x[train_size:]
y_train, y_val = y[:train_size], y[train_size:]

# reshape the data to the format expected by lstm layers
x_train= x_train.reshape(-1, 1, 1)
x_val = x_val.reshape(-1, 1, 1)


# you would then fit your model to your data
history = model.fit(x_train, y_train, epochs= 50, batch_size = 32, validation_data=(x_val, y_val))


# and then finally, you could use your trained model to predict the emission for 2020
# you would need to provide the emissions for the previous years here


# print(model.summary())

prediction = model.predict(np.array([[data[-1]]]))

# print(prediction)

