import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";

actor Token {

    // from = dfx identity get-principal
    var owner : Principal = Principal.fromText("fsvrx-tn2xn-jemqa-y7u5a-kv3rp-p4evf-pfoix-nyxkf-j5xtb-7weao-bae");
    var totalSupply : Nat = 1000000000;
    var symbol : Text = "Dang";

    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    balances.put(owner, totalSupply);

    public query func balanceOf(who : Principal) : async Nat {

        let balance : Nat = switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };

        return balance;
    };

    public query func getSymbol() : async Text {
        return symbol;
    };

    public shared (msg) func payOut() : async Text {
        if (balances.get(msg.caller) == null) {
            let amount = 10000;
            balances.put(msg.caller, amount);
            return "Success";
        }else {
            return "Already Claimed";
        };
    };

    public func transfer() {
            
    };

};
