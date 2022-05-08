import Team from "../../../models/team.model"
import { controller, errorFormatter } from "../../common"
import CountryList from "./CountryList"

const assignCountry: controller = async (req, res) => {
  let { teamName, countryName } = req.body as {
    teamName: string
    countryName: string
  }

  countryName = countryName.toUpperCase()

  if (!teamName || !countryName)
    return res.status(400).send({ message: "Incomplete Parameters" })

  try {
    const teamExists = await Team.findOne({ teamName })
    if (!teamExists)
      return res.status(404).send({ message: "Team Doesn't Exist" })
    const countryExists = CountryList[countryName]
    console.log(countryExists)
    if (!countryExists)
      return res.status(404).send({ message: "Country Doesn't Exist" })
    await teamExists.updateOne({
      $set: {
        countryName,
        banned: countryExists,
        allowed: true,
      },
    })

    return res.status(200).send({ message: "Country Assigned" })
  } catch (err) {
    console.log({ profile: err })
    const e = errorFormatter(err.message)
    console.log({ assignCountry: e })
    return res.status(500).send(e)
  }
}

export default assignCountry
