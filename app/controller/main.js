const {AppController, AppException, AppResponse, AppLang} = require("@pints/cores");

class MainController extends AppController{
	route(r){
		r.get("/", this.call("mainAction"));
	}

	rules(){
		return {
			username : [
				["Required", null, AppLang("USERNAME_REQUIRED")],
				["Length", {min: 6, max: 32}, AppLang("INVALID_USERNAME_LENGTH")]
			],
			email : [
				["Required", null, AppLang("EMAIL_REQUIRED")],
				["Email", null, AppLang("INVALID_EMAIL")]
			]
		}
	}

	async mainAction(req, res){
		res.json(AppResponse.success())
	}
}


module.exports = new MainController;