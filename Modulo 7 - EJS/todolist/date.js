//jshint esversion:6

module.exports.getDate = () => {
    
    let today = new Date();

    let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    };

    return today.toLocaleDateString("pt-BR", options);
};

exports.getDay = () => {
    
    const today = new Date();
    const options = {
    weekday: "long",
    };
    return today.toLocaleDateString("pt-BR", options);
};
