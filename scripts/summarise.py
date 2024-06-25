import os 
import pandas as pd

DATA_PATH = os.path.join('src', '_data')
data = pd.read_csv(os.path.join(DATA_PATH,  'predictions-2024.csv'))

if __name__ == '__main__':

    summary = data['winner'].value_counts().reset_index()

    summary.columns = ['party', 'count']
    
    total_seats = summary['count'].sum()

    summary['percent'] = ((summary['count'] / total_seats) * 100).round(2)

    summary.to_csv(os.path.join(DATA_PATH, 'summary.csv'), index=False)