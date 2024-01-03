import fs from "fs";
import { PDFDocument } from "pdf-lib";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import path from "path";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const merger = asyncHandler(async (req, res) => {
  if (!req.files.docs) {
    throw new ApiError(401, "Files not found ");
  }

  let inputpaths = [];
  req.files.docs.forEach((element) => {
    inputpaths.push(element.filename);
  });

  const basePath = path.resolve("public", "temp");
  const outputPath = "output.pdf";

  const pdfDoc = await PDFDocument.create();
  for (const inputPath of inputpaths) {
    const pdfBytes = await fs.promises.readFile(
      path.resolve(basePath, inputPath)
    );
    const externalPdfDoc = await PDFDocument.load(pdfBytes);
    const copiedPages = await pdfDoc.copyPages(
      externalPdfDoc,
      externalPdfDoc.getPageIndices()
    );
    fs.unlinkSync(path.resolve(basePath, inputPath));
    copiedPages.forEach((page) => pdfDoc.addPage(page));

    const mergePdfBytes = await pdfDoc.save();
    await fs.promises.writeFile(
      path.resolve(basePath, outputPath),
      mergePdfBytes
    );
  }

  const result = path.resolve("public", "temp", "output.pdf");

  const avatar = await uploadOnCloudinary(result);

  if (!avatar) {
    return new ApiError(500, "url is not created");
  }
  res.status(201).json(new ApiResponse(200, avatar.url, "PDF file merged"));
});

export { merger };
