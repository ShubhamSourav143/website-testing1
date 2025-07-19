'use client';
// --- Only render for admin users! (pseudo check) ---
export default function NewBlogPage() {
  // TODO: Integrate real user/auth/admin check
  // const isAdmin = ...check user session/role
  const isAdmin = true; // TEMP for demo

  if (!isAdmin) return <div className="p-8 text-center">You need admin access to post a blog.</div>;

  // Minimal blog post form starter
  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-6 my-12">
      <h2 className="text-2xl font-bold mb-4">Create New Blog Post</h2>
      <form>
        <input className="w-full mb-3 px-4 py-2 border rounded" placeholder="Title" required />
        <textarea className="w-full mb-3 px-4 py-2 border rounded" placeholder="Description" rows={2} required />
        <textarea className="w-full mb-3 px-4 py-2 border rounded" placeholder="Full Content" rows={5} required />
        <input className="w-full mb-3 px-4 py-2 border rounded" placeholder="Image URL" required />
        <input className="w-full mb-3 px-4 py-2 border rounded" placeholder="Tags (comma separated)" />
        <button className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold" type="submit">
          Post Blog
        </button>
      </form>
    </div>
  );
}

