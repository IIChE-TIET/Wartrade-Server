import Mail from "nodemailer/lib/mailer"
import transporter from "../Nodemailer/config"

const forgotPasswordLink = (teamName: string, token: string) =>
  (process.env.NODE_ENV === "production"
    ? "https://wartrade.netlify.app/forgotPassword/"
    : "http://localhost:3000/forgotPassword/") +
  teamName +
  "/" +
  token
const mailMessage = (teamName: string, token: string) => `
<body
  style="
    width: 100%;
    height: 100%;
    background: #000;
    color: #fff;
    padding: 2rem 0;
  "
>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td style="text-align: center">
        <img
          height="100px"
          style="object-fit: cover"
          src="https://ik.imagekit.io/qhjbxokyvp1/iiche/Logo_emPU8XF8m.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1651092250711"
        />
      </td>
    </tr>
    <tr>
      <td style="text-align: center">
        <p style="text-align: center">
          Greetings from IIChE TIET!!
          <br /><br />
          Open the following link to change your password ${forgotPasswordLink(
            teamName,
            token
          )}
          <br /><br />
          If this request wasn't made by you, get in touch with us
          <br />
          <br />
          Parth Sood(Gen Sec) : 7986810284
          <br />
          Aryan Gupta(Tech Head) : 8146740057
          <br /><br />
          Or simply reply to this mail thread
          <br /><br />
          Regards
          <br />
          Team IIChE TIET
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align: center">
        <img
          height="200px"
          style="object-fit: cover"
          src="https://ik.imagekit.io/qhjbxokyvp1/iiche/wartrade_DPhwrmAlW?ik-sdk-version=javascript-1.4.3&updatedAt=1651092349086"
        />
      </td>
    </tr>
    <tr>
      <td style="text-align: center">
        <a href="https://wartrade.netlify.app">
          <button
            style="
              padding: 0.5rem 1rem;
              background: skyblue;
              color: #fff;
              border: 0;
            "
          >
            Login
          </button></a
        >
      </td>
    </tr>
  </table>
</body>
`

const forgotPasswordMail = async (
  email: string,
  teamName: string,
  token: string
) => {
  const options: Mail.Options = {
    from: process.env.NODEMAILER_SENDER,
    to: email,
    subject: "Wartrade 2.0 Reset Password",
    html: mailMessage(teamName, token),
  }
  try {
    await transporter.sendMail(options)
  } catch (err) {
    throw err
  }
}

export default forgotPasswordMail
