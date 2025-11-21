import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import { promises as fs } from "fs";
import { insertContactSchema } from "@shared/schema";

const upload = multer({ storage: multer.memoryStorage() });

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      
      // Store contact submission
      const submission = await storage.createContactSubmission(validatedData);
      
      // In a real application, you would send an email here
      // For now, we just log and return success
      console.log("Contact form submission:", submission);
      
      res.json({ success: true, message: "Message received successfully" });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ success: false, error: "Invalid form data" });
    }
  });

  // Photo upload endpoint
  app.post("/api/upload-photo", upload.single("photo"), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // In a real application, you would save this to cloud storage
      // For now, we'll return a data URL
      const base64 = req.file.buffer.toString("base64");
      const dataUrl = `data:${req.file.mimetype};base64,${base64}`;
      
      res.json({ success: true, photoUrl: dataUrl });
    } catch (error) {
      console.error("Photo upload error:", error);
      res.status(500).json({ error: "Failed to upload photo" });
    }
  });

  // Update content.json endpoint
  app.put("/api/content", async (req: Request, res: Response) => {
    try {
      const contentPath = path.join(process.cwd(), "client", "public", "content.json");
      await fs.writeFile(contentPath, JSON.stringify(req.body, null, 2));
      res.json({ success: true });
    } catch (error) {
      console.error("Content update error:", error);
      res.status(500).json({ error: "Failed to update content" });
    }
  });

  // Resume download endpoints
  app.get("/api/resume/sde", async (req: Request, res: Response) => {
    try {
      // Try to find the resume file in attached_assets or provide a placeholder
      const possiblePaths = [
        path.join(process.cwd(), "attached_assets", "SDE_Resume.pdf"),
        path.join(process.cwd(), "attached_assets", "SDE resume.pdf"),
        path.join("/mnt/data", "SDE resume.pdf"),
      ];

      let filePath: string | null = null;
      for (const p of possiblePaths) {
        try {
          await fs.access(p);
          filePath = p;
          break;
        } catch {
          continue;
        }
      }

      if (!filePath) {
        // Send HTML response with instructions instead of JSON error
        const html = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Resume Not Available</title>
            <style>
              body { 
                font-family: system-ui, -apple-system, sans-serif; 
                max-width: 600px; 
                margin: 100px auto; 
                padding: 20px;
                text-align: center;
              }
              h1 { color: #7c3aed; }
              .instructions {
                background: #f3f4f6;
                padding: 20px;
                border-radius: 8px;
                margin-top: 20px;
                text-align: left;
              }
            </style>
          </head>
          <body>
            <h1>Resume Not Available</h1>
            <p>The SDE Resume PDF has not been uploaded yet.</p>
            <div class="instructions">
              <h3>To Add Resume:</h3>
              <ol>
                <li>Place your SDE resume PDF in the <code>attached_assets/</code> directory</li>
                <li>Name it <code>SDE_Resume.pdf</code></li>
                <li>The download will work automatically</li>
              </ol>
            </div>
            <p><a href="/">← Back to Portfolio</a></p>
          </body>
          </html>
        `;
        return res.status(404).send(html);
      }

      res.download(filePath, "Kishore_Kumar_SDE_Resume.pdf");
    } catch (error) {
      console.error("Resume download error:", error);
      res.status(500).json({ error: "Failed to download resume" });
    }
  });

  app.get("/api/resume/ai", async (req: Request, res: Response) => {
    try {
      // Try to find the resume file in attached_assets or provide a placeholder
      const possiblePaths = [
        path.join(process.cwd(), "attached_assets", "AI_Resume.pdf"),
        path.join(process.cwd(), "attached_assets", "AI_KISHORE_KUMAR S_S Resume.pdf"),
        path.join("/mnt/data", "AI_KISHORE_KUMAR S_S Resume.pdf"),
      ];

      let filePath: string | null = null;
      for (const p of possiblePaths) {
        try {
          await fs.access(p);
          filePath = p;
          break;
        } catch {
          continue;
        }
      }

      if (!filePath) {
        // Send HTML response with instructions instead of JSON error
        const html = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Resume Not Available</title>
            <style>
              body { 
                font-family: system-ui, -apple-system, sans-serif; 
                max-width: 600px; 
                margin: 100px auto; 
                padding: 20px;
                text-align: center;
              }
              h1 { color: #06b6d4; }
              .instructions {
                background: #f3f4f6;
                padding: 20px;
                border-radius: 8px;
                margin-top: 20px;
                text-align: left;
              }
            </style>
          </head>
          <body>
            <h1>Resume Not Available</h1>
            <p>The AI/ML Resume PDF has not been uploaded yet.</p>
            <div class="instructions">
              <h3>To Add Resume:</h3>
              <ol>
                <li>Place your AI/ML resume PDF in the <code>attached_assets/</code> directory</li>
                <li>Name it <code>AI_Resume.pdf</code></li>
                <li>The download will work automatically</li>
              </ol>
            </div>
            <p><a href="/">← Back to Portfolio</a></p>
          </body>
          </html>
        `;
        return res.status(404).send(html);
      }

      res.download(filePath, "Kishore_Kumar_AI_Resume.pdf");
    } catch (error) {
      console.error("Resume download error:", error);
      res.status(500).json({ error: "Failed to download resume" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
