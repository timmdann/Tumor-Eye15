export interface Detection {
  bbox: [number, number, number, number];
  confidence: number;
  class_id: number;
  class_name: string;
}

export interface PredictResponse {
  input_image_url: string;
  prediction_image_url: string;
  image_shape: { height: number; width: number };
  detections: Detection[];
  model_names: Record<number, string>;
  params: { conf: number; iou: number; label_strategy: string };
  timing_ms: number;
}

export type UserRole = "doctor" | "student";
