from datetime import datetime

def get_date(date):
    time = datetime.now()
    if time.hour - date.hour < 60:
        return 'Il y a ' + str(time.minute - date.minute) + ' minutes'
    elif date.day == time.day:
        return 'Il y a ' + str(time.hour - date.hour) + ' heures'
    elif date.month == time.month:
        return 'Il y a ' + str(time.day - date.day) + ' jours'
    elif date.year == time.year:
        return 'Il y a ' + str(time.month - date.month) + ' mois'
    else:
        return 'Il y a ' + str(time.year - date.year) + ' années'
        
