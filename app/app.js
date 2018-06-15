const {
	AppConfig,
	Application
} 											= require("@pints/cores");



module.exports = class Bootstrap extends Application{

	config(){
		return {
			port 					: AppConfig("APP_PORT"),
			use_socket 		: true,
			rules 				: {},
			rbac 					: {}
		}
	}

	http(){
		return [
			{endpoint : "/", module: require("./controllers/main")},
		]
	}

	depends(){
		process.on('unhandledRejection', (reason, promise) => {
			this.$logger.unhandled('Unhandled Rejection at: '+ reason.stack, true)
		});
	}

	async run(){}
}