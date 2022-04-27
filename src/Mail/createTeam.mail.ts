import Mail from "nodemailer/lib/mailer"
import transporter from "../Nodemailer/config"

const mailMessage = `
<body
  style="
    width: 100%;
    height: 100vh;
    background: #000;
    color: #fff;
    padding: 2rem 0;
  "
>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td style="text-align: center">
        <img
          height="200px"
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
          We are glad to inform you that you have successfully registered as a
          team/individual for our event WARTRADE2.0.
          <br /><br />
          It is going to be an adventurous ride as promised by our team.
          <br />
          Looking forward to your participation.
          <br /><br />
          If you have any query you can contact the following people
          <br />
          <br />
          Parth Sood : 7986810284
          <br />
          Aryan Gupta : 8146740057
          <br />
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
              padding: 1rem 1.5rem;
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

const createTeamMail = async (email: string, teamName: string) => {
  const options: Mail.Options = {
    from: process.env.NODEMAILER_SENDER,
    to: email,
    subject: `Guild "${teamName}" Successfully Created`,
    html: mailMessage,
  }
  try {
    await transporter.sendMail(options)
  } catch (err) {
    throw err
  }
}

export default createTeamMail
