import pandas as pd

# Read the Parquet file
df = pd.read_parquet('input.parquet')

# Convert the DataFrame to CSV
#df.to_csv('output.csv', index=False)

# Load the CSV file
#df_csv = pd.read_csv('output.csv')

# Get unique values in the 'Player 1' column
unique_values = df['Player 1'].unique()

# Split the CSV into different files based on unique values
for value in unique_values:
    filtered_df = df[df['Player 1'] == value]
    filename = f'Players/{value}.csv'
    filtered_df.to_csv(filename, index=False)

print('CSV files split successfully.')

csv_file = pd.DataFrame(unique_values, columns= list('a'))
csv_file.to_csv('names.csv')