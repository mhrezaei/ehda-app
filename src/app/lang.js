import {fromJS} from 'immutable';

const fallback = 'fa';
const lang = fallback;

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
	return parseInt(input.toString().replace(/[۰|۱|۲|۳|۴|۵|۶|۷|۸|۹]/g, function (w) {
		return id.indexOf(w);
	}));
};


const locale = fromJS({
	'fa': {
		'app': {
			'name': 'پدافند هوایی',
			'my_courses': 'کلاس های من',
			'profile': 'پروفایل',
			'my_purchases': 'خرید های من',
			'settings': 'تنظیمات',
			'help': 'سوالات متداول',
			'logput': 'خروج',
			'catalog': 'فهرست',
			'search_hint': 'جستجو در دروس ..',
			'signup': 'ثبت نام',
			'login': 'ورود',
			'dashboard': 'داشبورد',
			'favorites': 'نشان شده ها'
		},
		'fields': {
			'first_name': 'نام کوچک',
			'last_name': 'نام خانوادگی',
			'father_name': 'نام پدر',
			'ssn_number': 'شماره شناسنامه',
			'sex_type': 'جنسیت',
			'relation_status': 'وضعیت تاهل',
			'birth_date': 'تاریخ تولد',
			'graduation_status': 'سطح سواد',
			'language': 'زبان دوم',
			'job_title': 'شغل',
			'language_influence': 'تسلط به زبان',
		},
		'attributes': {
			'accepted': ':attribute باید پذیرفته شده باشد.',
			'active_url': 'آدرس :attribute معتبر نیست',
			'after': ':attribute باید تاریخی بعد از :date باشد.',
			'alpha': ':attribute باید شامل حروف الفبا باشد.',
			'alpha_dash': ':attribute باید شامل حروف الفبا و عدد و خظ تیره(-) باشد.',
			'alpha_num': ':attribute باید شامل حروف الفبا و عدد باشد.',
			'array': ':attribute باید شامل آرایه باشد.',
			'before': ':attribute باید تاریخی قبل از :date باشد.',
			'between': {
				'numeric': ':attribute باید بین :min و :max باشد.',
				'date': ':attribute باید تاریخی بین :min و :max باشد.',
				'file': ':attribute باید بین :min و :max کیلوبایت باشد.',
				'string': ':attribute باید بین :min و :max کاراکتر باشد.',
				'alpha': ':attribute باید بین :min و :max کاراکتر باشد.',
				'array': ':attribute باید بین :min و :max آیتم باشد.'
			},
			'boolean': 'فیلد :attribute فقط میتواند صحیح و یا غلط باشد',
			'confirmed': ':attribute با تاییدیه مطابقت ندارد.',
			'date': ':attribute یک تاریخ معتبر نیست.',
			'date_format': ':attribute با الگوی :format مطاقبت ندارد.',
			'different': ':attribute و :other باید متفاوت باشند.',
			'digits': ':attribute باید :digits رقم باشد.',
			'digits_between': ':attribute باید بین :min و :max رقم باشد.',
			'dimensions': ':attribute دارای ابعاد تصویر نامعتبر می‌باشد.',
			'distinct': 'فیلد :attribute دارای یک مقدار تکراری می‌باشد.',
			'email': 'فرمت :attribute معتبر نیست.',
			'exists': ':attribute انتخاب شده، معتبر نیست.',
			'file': ':attribute باید یک فایل باشد',
			'filled': 'فیلد :attribute الزامی است',
			'image': ':attribute باید تصویر باشد.',
			'in': ':attribute انتخاب شده، معتبر نیست.',
			'in_array': 'فیلد :attribute در :other وجود ندارد.',
			'integer': ':attribute باید نوع داده ای عددی (integer) باشد.',
			'ip': ':attribute باید IP آدرس معتبر باشد.',
			'json': 'فیلد :attribute باید یک رشته از نوع JSON باشد.',
			'max': {
				'numeric': ':attribute نباید بزرگتر از :max باشد.',
				'file': ':attribute نباید بزرگتر از :max کیلوبایت باشد.',
				'string': ':attribute نباید بیشتر از :max کاراکتر باشد.',
				'alpha': ':attribute نباید بیشتر از :max کاراکتر باشد.',
				'array': ':attribute نباید بیشتر از :max آیتم باشد.'
			},
			'mimes': ':attribute باید یکی از فرمت های :values باشد.',
			'mimetypes': ':attribute باید یکی از فرمت های :values باشد.',
			'min': {
				'numeric': ':attribute نباید کوچکتر از :min باشد.',
				'file': ':attribute نباید کوچکتر از :min کیلوبایت باشد.',
				'string': ':attribute نباید کمتر از :min کاراکتر باشد.',
				'alpha': ':attribute نباید کمتر از :min کاراکتر باشد.',
				'array': ':attribute نباید کمتر از :min آیتم باشد.'
			},
			'not_in': ':attribute انتخاب شده، معتبر نیست.',
			'numeric': ':attribute باید شامل عدد باشد.',
			'present': 'فیلد :attribute باید در پارامترهای ارسالی وجود داشته باشد.',
			'regex': ':attribute یک فرمت معتبر نیست',
			'required': 'فیلد :attribute الزامی است',
			'required_if': 'فیلد :attribute هنگامی که :other برابر با :value است، الزامیست.',
			'required_unless': 'فیلد :attribute ضروری است، مگر آنکه :other در :values وجود داشته باشد.',
			'required_with': ':attribute الزامی است زمانی که :values موجود است.',
			'required_with_all': ':attribute الزامی است زمانی که :values موجود است.',
			'required_without': ':attribute الزامی است زمانی که :values موجود نیست.',
			'required_without_all': ':attribute الزامی است زمانی که :values موجود نیست.',
			'same': ':attribute و :other باید مانند هم باشند.',
			'size': {
				'numeric': ':attribute باید برابر با :size باشد.',
				'file': ':attribute باید برابر با :size کیلوبایت باشد.',
				'string': ':attribute باید برابر با :size کاراکتر باشد.',
				'alpha': ':attribute باید برابر با :size کاراکتر باشد.',
				'array': ':attribute باسد شامل :size آیتم باشد.'
			},
			'string': 'فیلد :attribute باید یک String باشد.',
			'timezone': 'فیلد :attribute باید یک منطقه صحیح باشد.',
			'unique': ':attribute قبلا انتخاب شده است.',
			'uploaded': 'فایل :attribute با موفقیت آپلود نشد.',
			'url': 'فرمت آدرس :attribute اشتباه است.',
			'phone': 'فیلد :attribute باید یک شماره موبایل معتبر باشد.'
		},
		'single':'مجرد',
		'choose-year':'انتخاب سال',
		'choose-month':'انتخاب ماه',
		'choose-day':'انتخاب روز',
		'accept':'تایید',
		'cancel':'لغو',
		'today':'امروز',
		'gregorian-months': [
			'ژانویه',
			'فوریه',
			'مارس',
			'آوریل',
			'مه',
			'ژوئن',
			'ژوئیه',
			'اوت',
			'سپتامبر',
			'اکتبر',
			'نوامبر',
			'دسامبر'
		],
		'jalali-months': [
			'فروردین',
			'اردیبهشت',
			'خرداد',
			'تیر',
			'مرداد',
			'شهریور',
			'مهر',
			'آبان',
			'آذر',
			'دی',
			'بهمن',
			'اسفند'
		],

		'illiterate': 'بی سواد',
		'diploma': 'دیپلم',
		'bachelor': 'کارشناسی',
		'masters': 'کارشناسی ارشد',
		'doctorat': 'دکترا',


		'english': 'انگلیسی',
		'french': 'فرانسوی',
		'arabic': 'عربی',
		'deutsch': 'آلمانی',

		'bad': 'بد',
		'good': 'متوسط',
		'fluent': 'خوب',
		'native': 'زبان مادری',


		'married':'متاهل',
		'male': 'مرد',
		'female': 'زن',
		'other': 'دیگر',

		'choose': 'انتخاب نشده',
		'welcome': 'خوش آمدید',
		'sign-out': 'خروج',
		'messaging': 'پیام ها',
		'toman': 'تومان'
	}
});

const translate = (key, data) => {
	if (key === 'direction') {
		if (lang === 'fa')
			return 'right-to-left';
		else
			return 'left-to-right';
	}

	const keys = key.split('.');
	let ok = locale.getIn([lang, ...keys], locale.get([fallback, ...keys], key));
	if (data) {
		for (let key in data) {
			if (data.hasOwnProperty(key)) {
				const item = data[key];
				ok = ok.replace(new RegExp(`:${key}`, 'g'), item);
			}
		}
	}
	return typeof ok === 'string' ? localize_number(ok) : ok;
};

export default translate;
