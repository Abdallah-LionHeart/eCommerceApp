using System.Runtime.Serialization;

namespace API.OrderAggregate
{
 public enum OrderStatus
 {
  [EnumMember(Value = "pending")]
  pending,
  [EnumMember(Value = "PaymentReceived")]

  PaymentReceived,
  [EnumMember(Value = "PaymentFailed")]

  PaymentFailed,
  [EnumMember(Value = "Success")]

  Success,
  [EnumMember(Value = "Canceled")]

  Canceled,
 }
}