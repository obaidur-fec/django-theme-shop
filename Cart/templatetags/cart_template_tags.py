from django import template
from Cart.models import Carts


register = template.Library()

@register.filter
def cart_item_count(user):
    if user.is_authenticated:
        qs = Carts.objects.filter(user=user, ordered = False)
        if qs.exists():
            return qs [0].products.count()
    return 0
