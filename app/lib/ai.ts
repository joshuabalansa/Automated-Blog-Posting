import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `
Generate a unique, original, and engaging daily blog post about technology, formatted in **proper HTML**.

### **Content Requirements**:
- The blog post should be **800-1200+ words** and **well-structured** with:
  - **A compelling introduction**
  - **A detailed body with subtopics**
  - **A strong conclusion**
- Use **HTML formatting** to enhance readability and SEO:
  - **Headings:** Use <h1>, <h2>, and <h3> for sections.
  - **Text Formatting:** Use <strong> for bold text, <em> for italics, and <blockquote> for quotes.
  - **Lists:** Use <ul> and <ol> for bullet points and numbered lists.
  - **Code Blocks:** Wrap any code snippets inside <pre><code> for proper display.
  - **Links:** Format links using <a href="URL">text</a> for referencing sources.
- The content must be **entirely original**, avoiding copied content from external sources.
- The blog should be **SEO-friendly**, integrating relevant **keywords naturally**.
- The blog must cover **one or more of the following topics**:
  - **Emerging tech trends**
  - **Programming and development**
  - **Artificial Intelligence (AI)**
  - **Cybersecurity**
  - **Software innovations**
- **Conclude the blog post with 5-8 relevant hashtags**, wrapped inside a <p> tag.

### **Example Output Format**:
<h1>The Future of AI in Software Development</h1>
<p>Artificial Intelligence (AI) is transforming the way developers build and optimize software...</p>

<h2>How AI is Changing the Coding Landscape</h2>
<p>With AI-assisted development, programmers can now leverage smart automation...</p>

<ul>
  <li>AI-powered code completion</li>
  <li>Automated bug detection</li>
  <li>Enhanced cybersecurity measures</li>
</ul>

<blockquote>“AI will not replace developers, but developers who use AI will replace those who don’t.”</blockquote>

<h2>Challenges and Ethical Considerations</h2>
<p>Despite the benefits, AI in software development raises concerns about ethics...</p>

<pre><code>def hello_world():
    print("Hello, World!")</code></pre>

<p><strong>Hashtags:</strong> #ArtificialIntelligence #SoftwareDevelopment #CyberSecurity #MachineLearning #TechTrends</p>

Ensure the output **strictly follows this HTML structure**.
  `,
});

const generationConfig = {
  temperature: 0.9,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

/**
 * Generates a technology-focused blog post formatted in HTML.
 * @returns {Promise<string>}
 */
async function generateBlog(): Promise<string> {
  try {

    const chatSession = model.startChat({ generationConfig });

    const result = await chatSession.sendMessage("Generate a blog post.");

    const blogPost = result.response.text();

    return blogPost;

  } catch (error) {

    console.error("Error generating blog post:", error);

    throw new Error("Failed to generate blog post.");
  }
}

export { generateBlog };
