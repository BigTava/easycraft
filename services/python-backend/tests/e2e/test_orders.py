import json


def test_request_order(client):
    order = {"order": '''I'm looking to place an order for a specific product.
    It's a screw,falls under the hardware category, and it's made of iron.
    This particular screw has a diameter of 6 units,
    and it's quite lightweight, only about 0.01 units.
    I need five of these screws.
    The screws I'm interested in have a smooth surface finish.
    Also, they are produced by casting
    and have a tolerance of 0.1 units. Additionally, I need them to have a
    thread count of 40. As for the delivery, I'd like to have my order
    delivered by July 28, 2023. Could you please ship the order to my
    address at 123 Main St, Anytown, USA? That's also the
    address you can use for the billing. At this time,
    I don't have any specific design files to provide,
    so we can skip that part.'''}

    response = client.post("/api/orders", json=order)

    print(response.json())
