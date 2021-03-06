window.addEventListener('load', () => {
	const signUpButton = document.querySelector('#signUpButton');

	signUpButton.addEventListener('click', () => {
		isValidSignUpData();
	});
});

const isValidSignUpData = () => {
	const id = document.querySelector('#id').value;
	const password = document.querySelector('#password').value;
	const rePassword = document.querySelector('#rePassword').value;

	if (isValidId(id) && isValidPassword(password, rePassword)) {
		submitSignUpData({ user_id: id, user_password: password });
	}
};

const submitSignUpData = async signUpData => {
	try {
		const response = await fetch('/users', { method: 'POST', body: JSON.stringify(signUpData) });

		if (response.redirected) {
			return (location.href = response.url);
		}

		if (response.ok) {
			const successSignUp = await response.text();

			if (!successSignUp) {
				document.querySelector('#password').value = '';
				document.querySelector('#rePassword').value = '';
				document.querySelector('#id').focus();

				alert('이미 사용중인 아이디입니다.');
			}
		} else {
			throw new Error('500');
		}
	} catch (error) {
		console.log('error.....', error);
		location.href = '/error-500';
	}
};

const isValidId = id => {
	if (!id) {
		document.querySelector('#id').focus();
		return;
	}
	return true;
};

const isValidPassword = (password, rePassword) => {
	if (!password) {
		document.querySelector('#password').focus();
		return;
	}

	if (!rePassword) {
		document.querySelector('#rePassword').focus();
		return;
	}

	if (password !== rePassword) {
		document.querySelector('#rePassword').value = '';
		document.querySelector('#password').focus();
		alert('비밀번호가 올바르지 않습니다.');

		return;
	}
	return true;
};
