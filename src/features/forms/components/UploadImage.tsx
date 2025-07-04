import { Cloudinary } from "@cloudinary/url-gen"
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity"
import { auto } from "@cloudinary/url-gen/actions/resize"
import { AdvancedImage } from "@cloudinary/react"

export default function UploadImage() {
  const cld = new Cloudinary({ cloud: { cloudName: "deqsbrlb2" } })

  // Use this sample image or upload your own via the Media Explorer
  const img = cld
    .image("cld-sample-3")
    .format("auto") // Optimize delivery by resizing and applying auto-format and auto-quality
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(200).height(200)) // Transform the image: auto-crop to square aspect_ratio

  return <AdvancedImage cldImg={img} />
}
