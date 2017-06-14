/**
 * Creates an image URL.
 * @arg {Object} imageObject
 * @arg {string} [size] Size of the image. Append '_2x' to any size to get Retina quality images. Defaults to 'thumb'
 * @arg {string} [fileType] An image file format extension, e.g. .jpg, .png, .webp, etc.
 * @returns {string} An image URL
 * Permitted `size` descriptors, from smallest to largest:
 * micro - 35x35
 * thumb - 90x90
 * cover_small - 90x128
 * logo_med - 284x160
 * cover_big - 227x320
 * screenshot_med - 569x320
 * screenshot_big - 889x500
 * screenshot_huge - 1280x720
 * Append '_2x' to any size descriptor to recieve a Retina (DPR 2.0) quality image, e.g. `cover_small_2x`.
 */
export default (imageObject, size, fileType) => {
    if (!imageObject) {
        throw new Error('No image object recieved');
    }

    return `https://images.igdb.com/igdb/image/upload/t_${(size || 'thumb')}/${imageObject.cloudinary_id}.${(fileType || 'jpg')}`;
};
