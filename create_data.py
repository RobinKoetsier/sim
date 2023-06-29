import pandas as pd
import sys
# Read the Parquet file
df = pd.read_parquet('parquetfiles/CAM.parquet')
df = pd.concat([pd.read_parquet('parquetfiles/CAM.parquet'),
        pd.read_parquet('parquetfiles/CM.parquet'),
        pd.read_parquet('parquetfiles/DM.parquet'),
        pd.read_parquet('parquetfiles/FB.parquet'),
        pd.read_parquet('parquetfiles/ST.parquet'),
        pd.read_parquet('parquetfiles/Winger.parquet')])
# Convert the DataFrame to CSV
#df.to_csv('output.csv', index=False)

# Load the CSV file
#df_csv = pd.read_csv('output.csv')

# Get unique values in the 'Player 1' column
# unique_values = df['Player 1'].unique()
# len(unique_values)
# Split the CSV into different files based on unique values
positions = ['CAM', 'CM', 'DM','FB','ST','Winger']
positions = ['FB','ST','Winger']
# positions = ['CAM']
for pos in positions:
    print(pos)
    df = pd.read_parquet(f'parquetfiles/{pos}.parquet')
    unique_values = df['Player 1'].unique()
    for player in unique_values:
        print(player)
        base = df[(df['Player 1']==player) | (df['Player 2']==player)].sort_values(by=['Similarity'],ascending=False).reset_index(drop=True)
        base['Player'] = (base['Player 2']).where(base['Player 1'] == player, base['Player 1'])
        base = base.loc[:, ['Player', 'Similarity']]
        filtered_df = base
    # filtered_df = df[(df['Player 1'] == value | df['Player 2'] == value)]
        filename = f'Players/{player.replace("/","")}.csv'
        filtered_df.head(25).to_csv(filename, index=False)



player = "D. Zabala (31, Nacional, Uruguay Primera División 2023)"
print('CSV files split successfully.')

csv_file = pd.DataFrame(unique_values, columns= list('a'))
csv_file.to_csv('names.csv')