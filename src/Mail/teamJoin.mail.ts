import Mail from "nodemailer/lib/mailer"
import transporter from "../Nodemailer/config"

const joineeContent = (teamName: string) => `
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
        <img height="100px" style="object-fit: cover" src="https://ik.imagekit.io/qhjbxokyvp1/iiche/Logo_emPU8XF8m.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1651092250711" />
      </td>
    </tr>
    <tr>
      <td style="text-align: center">
        <p style="text-align: center">
          Congratulations!
          <br /><br />
          We are glad to inform you that you are now a part of the team
          ${teamName} for our event Wartrade2.0.
          <br />
          Looking forward to your participation in this adventure.
          <br /><br />

          If you have any query you can contact the following people
          <br />
          <br />
          Parth Sood(Gen Sec) : 7986810284
          <br />
          Aryan Gupta(Tech Head) : 8146740057
          <br /><br />
          Or simply reply to this mail thread
          <br /><br />
          Regards,
          <br />
          Team IIChE TIET
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align: center">
      <img height="200px" style="object-fit: cover"  src="https://ik.imagekit.io/qhjbxokyvp1/iiche/wartrade_DPhwrmAlW?ik-sdk-version=javascript-1.4.3&updatedAt=1651092349086" />
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

const leaderContent = (name: string) =>
  `<body
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
             <img height="100px" style="object-fit: cover" src="https://ik.imagekit.io/qhjbxokyvp1/iiche/Logo_emPU8XF8m.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1651092250711" />
           </td>
         </tr>
         <tr>
           <td style="text-align: center">
             <p style="text-align: center">
               Congratulations!
               <br /><br />
               We are glad to inform you that ${name} is now a part of your team.
               <br />
               Looking forward to your participation in this adventure.
               <br /><br />
               If you have any query you can contact the following people
               <br /><br />
               Parth Sood(Gen Sec) : 7986810284
               <br />
               Aryan Gupta(Tech Head) : 8146740057
               <br /><br />
               Or simply reply to this mail thread
               <br /><br />
               Regards,
               <br />
               Team IIChE TIET
             </p>
           </td>
         </tr>
         <tr>
           <td style="text-align: center">
             <img height="200px" style="object-fit: cover"  src="https://ik.imagekit.io/qhjbxokyvp1/iiche/wartrade_DPhwrmAlW?ik-sdk-version=javascript-1.4.3&updatedAt=1651092349086" />
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

const teamJoinMail = async (
  leaderEmail: string,
  name: string,
  email: string,
  teamName: string
) => {
  const joineeOptions: Mail.Options = {
    from: process.env.NODEMAILER_SENDER,
    to: email,
    subject: `Team  "${teamName}" Joined`,
    html: joineeContent(teamName),
  }
  const leaderOptions: Mail.Options = {
    from: process.env.NODEMAILER_SENDER,
    to: leaderEmail,
    subject: `${name} joined your team "${teamName}"`,
    html: leaderContent(name),
  }
  try {
    await transporter.sendMail(joineeOptions)
    await transporter.sendMail(leaderOptions)
  } catch (err) {
    throw err
  }
}

export default teamJoinMail
