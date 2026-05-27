export const INITIAL_QUESTION =
  "Describe this result in detail from a radiology perspective";

export const INITIAL_RESPONSE =
  "The MRI demonstrates a focal abnormal area in the superior cerebral hemisphere, highlighted by the detection box. The region shows altered signal intensity compared with the surrounding brain tissue and is classified by the AI model as a possible tumor with 84% confidence. The finding appears localized on this sagittal image, without obvious large mass effect on the visible slice. This AI-assisted result should be reviewed by a qualified radiologist and does not constitute a medical diagnosis.";

export function getSimulatedResponse(userQuestion: string): string {
  const q = userQuestion.toLowerCase();

  if (q.includes("green") || q.includes("label") || q.includes("box") || q.includes("highlight") || q.includes("marker"))
    return "The green label marks the AI-detected suspicious region. In this simulation, the highlighted area is classified as a possible tumor with 84.2% confidence. The green box does not confirm diagnosis; it only indicates the region that should be reviewed carefully by a qualified clinician.";

  if (q.includes("confidence") || q.includes("certainty") || q.includes("84") || q.includes("score") || q.includes("percentage") || q.includes("probability"))
    return "The confidence value represents how strongly the AI model associates the highlighted region with the selected finding. A confidence of 84.2% suggests a relatively strong model prediction, but it should not be interpreted as clinical certainty. The result still requires professional radiological review.";

  if (q.includes("tumor") || q.includes("cancer") || q.includes("malignant") || q.includes("benign") || q.includes("mass") || q.includes("lesion"))
    return "The highlighted area may correspond to an abnormal region detected by the AI model. However, this interface cannot determine whether the finding is malignant, benign, inflammatory, post-treatment related, or an artifact. A complete MRI study and clinical history would be required for proper interpretation.";

  if (q.includes("danger") || q.includes("serious") || q.includes("emergency") || q.includes("urgent") || q.includes("critical"))
    return "This result should be treated as a finding that needs medical review, not as an emergency diagnosis from the AI system. The safest interpretation is that the highlighted region requires confirmation by a radiologist, especially using the full MRI sequence and patient history.";

  if (q.includes("next") || q.includes("follow") || q.includes("recommend") || q.includes("what now") || q.includes("next step") || q.includes("management"))
    return "A reasonable next step would be to review the highlighted region across the full MRI series, compare it with previous scans if available, and correlate it with clinical symptoms. The AI output should be documented as supportive information, not as the final radiology conclusion.";

  if (q.includes("artifact") || q.includes("artefact") || q.includes("error") || q.includes("mistake") || q.includes("false positive") || q.includes("false"))
    return "Yes, a false positive is possible. MRI artifacts, image noise, motion, partial volume effects, or normal anatomical structures can sometimes be highlighted by AI models. This is why the result should be validated against the full scan by a qualified radiologist.";

  if (q.includes("diagnosis") || q.includes("diagnose") || q.includes("final result") || q.includes("is this a diagnosis"))
    return "This AI-assisted response should not be considered a final diagnosis. It is intended to support review by pointing to a suspicious region, but the final interpretation must be made by a qualified medical professional using the full imaging study and clinical context.";

  if (q.includes("mri") || q.includes("scan") || q.includes("image") || q.includes("slice"))
    return "The scan preview shows a highlighted region selected by the AI system for closer review. The visible slice suggests a localized abnormal signal area, but a complete assessment would require reviewing the full MRI sequence, imaging planes, and patient history.";

  if (q.includes("where") || q.includes("location") || q.includes("located") || q.includes("area") || q.includes("region"))
    return "The suspicious region is shown in the upper part of the visible cerebral hemisphere on this sagittal MRI slice. Because this is only one displayed image, the exact anatomical location should be confirmed by reviewing the full MRI study in multiple planes.";

  if (q.includes("accurate") || q.includes("accuracy") || q.includes("reliable") || q.includes("trust") || q.includes("correct"))
    return "The simulated AI result may help identify a region that deserves attention, but its accuracy cannot be guaranteed from this interface alone. AI detection should be treated as a support tool and verified by a qualified radiologist using the complete scan.";

  if (q.includes("why") || q.includes("what made"))
    return "The AI likely marked this region because its signal pattern differs from the surrounding brain tissue. In image-based tumor detection, features such as abnormal intensity, shape, texture, and contrast with nearby tissue may contribute to the model prediction.";

  if (q.includes("symptom") || q.includes("headache") || q.includes("seizure") || q.includes("vision") || q.includes("nausea") || q.includes("weakness"))
    return "Symptoms cannot be determined from the AI result alone. Brain lesions may be associated with symptoms such as headache, seizures, neurological weakness, visual changes, or no symptoms at all. Clinical history and medical examination are necessary for interpretation.";

  if (q.includes("biopsy") || q.includes("surgery") || q.includes("operation") || q.includes("remove"))
    return "This simulated AI result cannot determine whether biopsy or surgery is needed. Those decisions depend on the full MRI findings, lesion characteristics, patient symptoms, previous imaging, and specialist evaluation by neurology, neurosurgery, or oncology teams.";

  if (q.includes("treatment") || q.includes("therapy") || q.includes("radiation") || q.includes("chemo") || q.includes("medication"))
    return "Treatment cannot be recommended from this simulated AI result. Management depends on the confirmed diagnosis, tumor type if present, location, size, symptoms, and overall clinical context. The role of this tool is only to support image review.";

  if (q.includes("size") || q.includes("large") || q.includes("small") || q.includes("measure") || q.includes("dimension"))
    return "The displayed detection box gives an approximate visual region of interest, but it should not be used as a precise measurement. Accurate lesion size would require measurement on the original MRI images using radiology software and appropriate image scale.";

  if (q.includes("contrast") || q.includes("enhancement") || q.includes("bright") || q.includes("dark") || q.includes("signal"))
    return "The highlighted region appears to have signal characteristics that differ from the surrounding tissue. On MRI, abnormal brightness or contrast may reflect many possibilities, including tumor, inflammation, vascular change, post-treatment effect, or artifact. The full sequence is needed for interpretation.";

  if (q.includes("compare") || q.includes("previous") || q.includes("old scan") || q.includes("earlier"))
    return "Comparison with previous MRI scans would be very helpful. If the region is new, growing, or changing in signal pattern, that may increase clinical significance. If it is stable over time, interpretation may be different. This comparison should be done by a radiologist.";

  if (q.includes("report") || q.includes("summary") || q.includes("write") || q.includes("radiology report"))
    return "Suggested report-style wording: AI-assisted review identifies one highlighted suspicious region in the visible cerebral hemisphere, classified as possible tumor with 84.2% confidence. This finding is preliminary and should be correlated with the complete MRI study and clinical context.";

  if (q.includes("second opinion") || q.includes("specialist") || q.includes("doctor") || q.includes("radiologist") || q.includes("clinician"))
    return "A second opinion from a radiologist or relevant specialist would be appropriate if there is uncertainty. AI output should support clinical review, but the final assessment should come from a qualified medical professional.";

  if (q.includes("normal") || q.includes("abnormal") || q.includes("healthy"))
    return "The AI system has marked one region as suspicious, so the scan should not be treated as automatically normal based on this preview. However, abnormality cannot be confirmed from the AI overlay alone. The full scan needs professional review.";

  if (q.includes("risk") || q.includes("risk level") || q.includes("high risk") || q.includes("low risk"))
    return "The confidence score does not directly equal clinical risk. Risk assessment depends on imaging features, lesion behavior, symptoms, patient history, and comparison with prior studies. This AI result only indicates that the highlighted area deserves review.";

  if (q.includes("model") || q.includes("ai") || q.includes("algorithm") || q.includes("how does it work"))
    return "The simulated AI model reviews visual image patterns and highlights regions that resemble abnormalities learned from training examples. It does not understand the patient's full clinical situation and cannot replace professional interpretation.";

  if (q.includes("limitations") || q.includes("limit") || q.includes("cannot"))
    return "The main limitations are that the AI may miss findings, mark normal tissue as suspicious, and cannot use full clinical history unless provided. It also cannot replace multi-sequence MRI interpretation by a radiologist.";

  if (q.includes("edema") || q.includes("swelling") || q.includes("mass effect") || q.includes("pressure"))
    return "On this simulated preview, there is no clear large mass effect visible, but this cannot be assessed reliably from a single image. Evaluation for edema, swelling, or pressure effect requires the complete MRI series and radiologist interpretation.";

  if (q.includes("student") || q.includes("learn") || q.includes("training") || q.includes("education"))
    return "For learning purposes, this case can be used to practice identifying suspicious MRI regions, comparing AI predictions with visual findings, and understanding why AI outputs require clinical verification.";

  if (q.includes("patient") || q.includes("tell the patient") || q.includes("explain to patient"))
    return "A patient-friendly explanation could be: the AI system found one area on the MRI that looks different from nearby tissue and should be reviewed by a radiologist. This does not mean a confirmed diagnosis, but it helps point doctors to a region that may need closer evaluation.";

  if (q.includes("download") || q.includes("pdf") || q.includes("save"))
    return "You can save the result as a PDF from the results screen using the Save PDF button. The exported report should include the highlighted MRI preview, confidence value, and a note that the result is AI-assisted and not a final diagnosis.";

  return "Based on the simulated AI review, the highlighted region should be considered a suspicious area requiring professional evaluation. The model can help draw attention to the region, but it cannot replace a full radiological interpretation or clinical diagnosis.";
}
