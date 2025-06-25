import { Banner } from '../../models/banners/banners.model.js'
import { StatusHttp } from '../../lib/statusHttp.js'

async function createBanner (bannerData, file) {
  const { title } = bannerData
  const bannerFound = await Banner.findOne({ title })
  if (bannerFound) {
    throw new StatusHttp('Banner with this title already exists', 400)
  }
  // Validate if the file is provided
  // Then assign the ID of the field image for the banner
  const newBanner = await Banner.create(bannerData)
  return newBanner
}

async function getAllBanners () {
  const banners = await Banner.find({}).populate(['image', 'estateId'])
  // Field 'image' is populated with the url of the multimedia
  if (!banners) {
    throw new StatusHttp('There are no banners available', 404)
  }
  return banners
}

async function getBannerById (id) {
  const banner = await Banner.findById(id).populate(['image', 'estateId'])
  if (!banner) {
    throw new StatusHttp(`The banner doesn't exist with the ID: ${id}`, 404)
  }
  return banner
}
async function updateBanner (id, newBannerData, file) {
  const banner = await Banner.findById(id)
  if (!banner) {
    throw new StatusHttp(`The banner doesn't exist with the ID: ${id}`, 404)
  }
  if (file) {
    // Could add a validation for the file for multimedia and save on multimedia service
    // And then assign the ID to field image for newBannerData
    // For expample:
    // const multimedia = await Multimedia.create({ file: file.path })
    // newBannerData.image = multimedia._id
  }
  const updatedBanner = await Banner.findByIdAndUpdate(id, newBannerData, { new: true }).populate('image', 'url')
  if (!updatedBanner) {
    throw new StatusHttp(`The banner doesn't exist with the ID: ${id}`, 404)
  }
  return updatedBanner
}

async function deleteBanner (id) {
  const banner = await Banner.findByIdAndDelete(id)
  if (!banner) {
    throw new StatusHttp(`The banner doesn't exist with the ID: ${id}`, 404)
  }
  return banner
}
export {
  createBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
  deleteBanner
}
