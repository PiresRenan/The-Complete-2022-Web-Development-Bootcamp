import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  // var currentValue: Nat = 300;
  stable var currentValue: Float = 300;
  currentValue := 300;
  let id = 1996;
  Debug.print(debug_show(currentValue));

  stable var startTime = Time.now();
  startTime := Time.now();

  public func topUp(amount: Float){
    currentValue += amount;
  };

  // topUp();

  // Allow users to withdraw an amount from the currentValue
  // Decrease the currentValue by the amount
  public func withdraw(amount: Float){
    let tempValue: Float = currentValue - amount;
    if(tempValue >= 0){
      currentValue -= amount;
      Debug.print(debug_show(currentValue));
    }else {
      Debug.print("Amount too large, currentValue less than zero.")
    }
  };

  public query func checkBalance(): async Float {
    return currentValue;
  };

  public func compound() {
    let currentTime = Time.now();
    let timeElapseNS = currentTime - startTime;
    let timeElapsedS = timeElapseNS / 1000000000;
    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedS));
    startTime := currentTime;
  };
}