from datetime import datetime


def get_date(time=False):
    """
    Get a datetime object or a int() Epoch timestamp and return a
    pretty string like 'an hour ago', 'Yesterday', '3 months ago',
    'just now', etc
    Modified from: http://stackoverflow.com/a/1551394/141084
    """
    time = time.replace(tzinfo=None)
    now = datetime.utcnow()
    if type(time) is int:
        diff = now - datetime.fromtimestamp(time)
    elif isinstance(time, datetime):
        diff = now - time
    elif not time:
        diff = now - now
    else:
        raise ValueError('invalid date %s of type %s' % (time, type(time)))
    second_diff = diff.seconds
    day_diff = diff.days

    if day_diff < 0:
        return ''

    if day_diff == 0:
        if second_diff < 10:
            return "A l'instant"
        if second_diff < 60:
            return "Il y a " + str(second_diff) + " secondes"
        if second_diff < 120:
            return "Il y a une minute"
        if second_diff < 3600:
            return "Il y a " + str(int(second_diff / 60)) + " minutes"
        if second_diff < 7200:
            return "Il y a une heure"
        if second_diff < 86400:
            return "Il y a " + str(int(second_diff / 3600)) + " houres"
    if day_diff == 1:
        return "Hier"
    if day_diff < 7:
        return "Il y a " + str(day_diff) + " jours"
    if day_diff < 31:
        return "Il y a " + str(int(day_diff / 7)) + " semaines"
    if day_diff < 365:
        return "Il y a " + str(int(day_diff / 30)) + " mois"
    if day_diff < 730:
        return "Il y a une année"
    return "Il y a " + str(int(day_diff / 365)) + " années"
