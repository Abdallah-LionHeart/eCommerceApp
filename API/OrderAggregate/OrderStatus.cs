using System.Runtime.Serialization;

namespace API.OrderAggregate
{
 public enum OrderStatus
 {
  [EnumMember(Value = "pending")]
  pending,
  [EnumMember(Value = "Payment Received")]

  PaymentReceived,
  [EnumMember(Value = "Payment Failed")]

  PaymentFailed,
  [EnumMember(Value = "Success")]

  Success,
  [EnumMember(Value = "Canceled")]

  Canceled,
 }
}