import { createStore, combineReducers, applyMiddleware } from "redux";
import { Dishes } from "./dishes";
import { Comments } from "./comments";
import { Leaders } from "./leaders";
import { Promotions } from "./promotions";
import { createForms } from "react-redux-form";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { InitialLogin} from "./forms";

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			dishes: Dishes,
			comments: Comments,
			leaders: Leaders,
			promotions: Promotions,
			...createForms({ login: InitialLogin }),
		}),
		applyMiddleware(thunk, logger)
	);

	return store;
};
