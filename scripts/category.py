from customer.models import Category
from .utils import load_json

category = load_json('imarket_category.json')

def run(*arg):
    if len(arg) > 0:
        if arg[0] == 'add':
            for parent, subs in category.items():
                pc = Category(name=parent.lower())
                pc.save()
                for c in subs:
                    Category(name=c.lower(), parent=pc).save()
        elif arg[0] == 'clear':
            Category.objects.all().delete()
