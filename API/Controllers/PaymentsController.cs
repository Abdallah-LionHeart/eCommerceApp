using API.Entity;
using API.Errors;
using API.Interfaces;
using API.OrderAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace API.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private readonly IPaymentService _paymentService;
        private const string WhSecret = "whsec_0d38cd490be82020535faf81e4cd303a5dee3348934d427fce19ce676e8fde72";
        private readonly ILogger<PaymentsController> _logger;
        public PaymentsController(IPaymentService paymentService, ILogger<PaymentsController> logger)
        {
            _logger = logger;
            _paymentService = paymentService;

        }

        [Authorize]
        [HttpPost("{basketId}")]
        public async Task<ActionResult<CustomerBasket>> CreateOrUpdatePaymentIntent(string basketId)
        {
            var basket = await _paymentService.CreateOrUpdatePaymentIntent(basketId);
            if (basket == null) return BadRequest(new ApiResponse(400, "Problem With Your Basket"));
            return basket;
        }


        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebhook()
        {
            var json = await new StreamReader(Request.Body).ReadToEndAsync();
            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], WhSecret);

            PaymentIntent intent;
            Order order;

            switch (stripeEvent.Type)
            {
                case "payment_intent.succeeded":
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    _logger.LogInformation("Payment succeeded: ", intent.Id);
                    order = await _paymentService.UpdateOrderPaymentSucceeded(intent.Id);
                    _logger.LogInformation("Order Update to payment received: ", order.Id);

                    break;

                case "payment_intent.payment_failed":
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    _logger.LogInformation("Payment failed: ", intent.Id);
                    order = await _paymentService.UpdateOrderPaymentFailed(intent.Id);
                    _logger.LogInformation("Order Update to payment failed: ", order.Id);

                    break;

            }
            return new EmptyResult();
        }
    }
}

// This is your Stripe CLI webhook secret for testing your endpoint locally.
//  const string endpointSecret = "whsec_0d38cd490be82020535faf81e4cd303a5dee3348934d427fce19ce676e8fde72";

//  [HttpPost]
//  public async Task<IActionResult> StripeWebhook()
//  {
//   var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
//   try
//   {
//    var stripeEvent = EventUtility.ConstructEvent(json,
//        Request.Headers["Stripe-Signature"], endpointSecret);

//    // Handle the event
//    if (stripeEvent.Type == Events.PaymentIntentPaymentFailed)
//    {
//    }
//    else if (stripeEvent.Type == Events.PaymentIntentSucceeded)
//    {
//    }
//    // ... handle other event types
//    else
//    {
//     Console.WriteLine("Unhandled event type: {0}", stripeEvent.Type);
//    }

//    return Ok();
//   }
//   catch (StripeException e)
//   {
//    return BadRequest();
//   }
//  }


