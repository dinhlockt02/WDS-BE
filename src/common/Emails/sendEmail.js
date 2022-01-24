const nodemailer = require('nodemailer');

const { resetToken } = require("../../../db.json");

async function sendResetLink(recipient, userId, token) {
	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			type: 'OAUTH2',
			user: 'kietngo255@gmail.com',
			clientId:
				'971836066163-185oskniqjfk6gr3vkd93kgpk6hkjcu7.apps.googleusercontent.com',
			clientSecret: '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',
			accessToken:
				'ya29.A0ARrdaM8NfuR5oC7RRPWImeDoLMrDmkJUP53lqSAw2Wwa3Pwy3tRNJUVUHcJxSdZKl9GbfLxN7nwA90kRxKT_YpMJRaWU2Oc3x_3_XKrCqMpy1dvzNZ9w6MCjwYe09pLANRCY6fCmyCtWwmf5-UlkQYuSjPVC',
			refreshToken:
				'1//04cW1DaB5h3bnCgYIARAAGAQSNwF-L9IryfTxpZHyv1YSrzIRbrLTnlvVfvPTMFN1GTlzxBSoXEICUv8wExMOQvinNEDdRJxynG8',
		},
	});

	const mailOptions = {
		from: '"WD project" <kietngo255@gmail>',
		to: recipient,
		subject: 'Reset password link',
		html: `<p>http://localhost:3000/${token}</p>`,
	};

	let info = await transporter.sendMail(mailOptions);

	let tokens = resetToken.filter((token) => token.userId === userId);

	if (tokens.length <= 0) {
		resetToken.push({
			userId: userId,
			resetToken: token,
		});
	}

	console.log(info);

	return info;
}

module.exports.sendResetLink = sendResetLink;