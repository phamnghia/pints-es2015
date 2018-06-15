module.exports = class AppValidateRule {
	constructor(name, rules){
		this.name = name;
		this.rules = rules;
	}

	withValue(fieldValue){
		this.fieldValue = fieldValue;
		return this;
	}

	withFieldName(name){
		this.name = name;
		return this;
	}
}