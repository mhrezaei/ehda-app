import {fromJS} from 'immutable';
import dictionary from "./dictionary";

const fallback = 'en';

export const to_fa = (input) => {
	if (!input)
		return '';
	const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
	return input.toString().replace(/[0-9]/g, function (w) {
		return id[+w];
	});
};

export const to_en = (input) => {
	if (!input)
		return '';
	const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
	return input.toString().replace(/[۰|۱|۲|۳|۴|۵|۶|۷|۸|۹]/g, function (w) {
		return id.indexOf(w);
	});
};



export const localize_number = (num) => {
    if (global.language === 'fa') {
        return to_fa(num);
    } else {
        return to_en(num);
    }
};

const locale = fromJS(dictionary);

const translate = (key, data=null) => {
	if (key === 'direction') {
		if (global.language === 'fa')
			return 'right-to-left';
		else
			return 'left-to-right';
	}

	const keys = key.split('.');

	let ok = locale.getIn([global.language, ...keys], locale.getIn([fallback, ...keys], key));


    if (data) {
		for (let key in data) {
			if (data.hasOwnProperty(key)) {
				const item = data[key];
				ok = ok.replace(new RegExp(`:${key}`, 'g'), item);
			}
		}
	}
    console.log(ok);
	return typeof ok === 'string' ? localize_number(ok) : ok;
};

export default translate;
