import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Save } from "lucide-react";

export const SettingsManager = () => {
  const [settings, setSettings] = useState({
    siteConfig: {
      siteTitle: "Girona.ai Portfolio",
      heroImage: "",
      aboutVideoUrl: "",
      heroProfileImage: "",
      waitlistPopupTitle: "Free AI Course Coming Soon 🚀",
      waitlistPopupDescription: "Be the first to get access when we launch.",
      waitlistPopupDetail: "Join early and learn how to use AI tools, automation, and real-world strategies to stay ahead.",
    }
  });
  const [loading, setLoading] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);

  // Note: In a real environment, you might merge these configs dynamically,
  // but for now we present a simple interface to save generic sitewide data.

  const fetchSettings = async () => {
    const { data } = await supabase.from("site_settings").select("*");
    if (data && data.length > 0) {
      const parsed = data.reduce((acc, item) => ({ ...acc, [item.key]: item.value }), {});
      setSettings((prev) => ({ ...prev, siteConfig: { ...prev.siteConfig, ...parsed } }));
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalVideoUrl = settings.siteConfig.aboutVideoUrl;
      
      if (videoFile) {
        toast.info("Uploading video, this might take a moment...");
        const fileExt = videoFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('site-media')
          .upload(fileName, videoFile, {
            upsert: true,
          });
          
        if (uploadError) {
          toast.error(`Video upload failed: ${uploadError.message}. Make sure 'site-media' bucket exists!`);
          setLoading(false);
          return;
        }
        
        const { data: publicUrlData } = supabase.storage
          .from('site-media')
          .getPublicUrl(fileName);
          
        finalVideoUrl = publicUrlData.publicUrl;
      }

      let finalProfileUrl = settings.siteConfig.heroProfileImage;
      
      if (profileImageFile) {
        toast.info("Uploading profile image...");
        const fileExt = profileImageFile.name.split('.').pop();
        const fileName = `profile_${Date.now()}_scale.${fileExt}`;
        
        const { error: imageUploadError } = await supabase.storage
          .from('site-media')
          .upload(fileName, profileImageFile, {
            upsert: true,
          });
          
        if (imageUploadError) {
          toast.error(`Image upload failed: ${imageUploadError.message}`);
          setLoading(false);
          return;
        }
        
        const { data: publicUrlData } = supabase.storage
          .from('site-media')
          .getPublicUrl(fileName);
          
        finalProfileUrl = publicUrlData.publicUrl;
      }

      let finalHeroImageUrl = settings.siteConfig.heroImage;
      
      if (heroImageFile) {
        toast.info("Uploading main background image...");
        const fileExt = heroImageFile.name.split('.').pop();
        const fileName = `hero_bg_${Date.now()}_scale.${fileExt}`;
        
        const { error: heroUploadError } = await supabase.storage
          .from('site-media')
          .upload(fileName, heroImageFile, {
            upsert: true,
          });
          
        if (heroUploadError) {
          toast.error(`Hero image upload failed: ${heroUploadError.message}`);
          setLoading(false);
          return;
        }
        
        const { data: publicUrlData } = supabase.storage
          .from('site-media')
          .getPublicUrl(fileName);
          
        finalHeroImageUrl = publicUrlData.publicUrl;
      }

      const updates = [
        { key: "siteTitle", value: settings.siteConfig.siteTitle },
        { key: "heroImage", value: finalHeroImageUrl },
        { key: "aboutVideoUrl", value: finalVideoUrl },
        { key: "heroProfileImage", value: finalProfileUrl },
        { key: "waitlistPopupTitle", value: settings.siteConfig.waitlistPopupTitle },
        { key: "waitlistPopupDescription", value: settings.siteConfig.waitlistPopupDescription },
        { key: "waitlistPopupDetail", value: settings.siteConfig.waitlistPopupDetail },
      ];

      for (const update of updates) {
        // Upsert strategy if unique index exists on key
        const { error } = await supabase.from("site_settings").upsert(update, { onConflict: "key" });
        if (error) throw error;
      }
      
      setSettings((prev) => ({ 
        ...prev, 
        siteConfig: { 
          ...prev.siteConfig, 
          aboutVideoUrl: finalVideoUrl,
          heroProfileImage: finalProfileUrl,
          heroImage: finalHeroImageUrl
        } 
      }));
      setVideoFile(null);
      setProfileImageFile(null);
      setHeroImageFile(null);
      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  const updateConfig = (key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      siteConfig: { ...prev.siteConfig, [key]: value },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Website Editor</h1>
        <p className="text-muted-foreground mt-1">Change content, images, and configuration for the main website.</p>
      </div>

      <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-foreground mb-6">General Settings</h2>

        <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Website Title</label>
            <input
              type="text"
              value={settings.siteConfig.siteTitle}
              onChange={(e) => updateConfig("siteTitle", e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/30"
              placeholder="e.g. My Next-Gen App"
            />
            <p className="text-xs text-muted-foreground mt-1">This will change the main heading text of the website.</p>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Hero Profile Image (Round)</label>
            <div className="flex gap-4 items-start md:items-center flex-col md:flex-row">
              <div className="flex-1 w-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    if (file) {
                      setProfileImageFile(file);
                    }
                  }}
                  className="w-full px-4 py-3 rounded-lg text-sm border border-border bg-background focus:ring-2 focus:ring-primary/30 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
              </div>
              {(settings.siteConfig.heroProfileImage || profileImageFile) && (
                 <button
                   type="button"
                   onClick={() => {
                     setProfileImageFile(null);
                     updateConfig("heroProfileImage", "");
                   }}
                   className="px-6 py-3 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                 >
                   Remove Image
                 </button>
              )}
            </div>
            {settings.siteConfig.heroProfileImage && !profileImageFile && (
              <div className="mt-4 w-24 h-24 rounded-full overflow-hidden border border-border">
                <img src={settings.siteConfig.heroProfileImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
            )}
            {profileImageFile && (
              <p className="text-xs text-primary mt-2">Ready to upload: {profileImageFile.name}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Main Hero Background Image</label>
            <div className="flex gap-4 items-start md:items-center flex-col md:flex-row">
              <div className="flex-1 w-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    if (file) {
                      setHeroImageFile(file);
                    }
                  }}
                  className="w-full px-4 py-3 rounded-lg text-sm border border-border bg-background focus:ring-2 focus:ring-primary/30 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
              </div>
              {(settings.siteConfig.heroImage || heroImageFile) && (
                 <button
                   type="button"
                   onClick={() => {
                     setHeroImageFile(null);
                     updateConfig("heroImage", "");
                   }}
                   className="px-6 py-3 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                 >
                   Remove Image
                 </button>
              )}
            </div>
            
            {settings.siteConfig.heroImage && !heroImageFile && (
              <div className="mt-4 rounded-xl overflow-hidden border border-border w-full max-w-sm aspect-video relative">
                <img 
                  src={settings.siteConfig.heroImage} 
                  alt="Background Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">Active Background</div>
              </div>
            )}
            {heroImageFile && (
              <p className="text-xs text-primary mt-2">Ready to upload: {heroImageFile.name}</p>
            )}
            <p className="text-xs text-muted-foreground mt-2">Uploading an image will set it as the background. Click 'Remove Image' and Save to revert to the default gradient background.</p>
          </div>

          <div className="pt-4 border-t border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">About Section</h3>
            <label className="text-sm font-medium text-foreground block mb-2">About Section Video</label>
            <div className="flex gap-4 items-start md:items-center flex-col md:flex-row">
              <div className="flex-1 w-full">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    if (file) {
                      setVideoFile(file);
                    }
                  }}
                  className="w-full px-4 py-3 rounded-lg text-sm border border-border bg-background focus:ring-2 focus:ring-primary/30 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
              </div>
              {(settings.siteConfig.aboutVideoUrl || videoFile) && (
                 <button
                   type="button"
                   onClick={() => {
                     setVideoFile(null);
                     updateConfig("aboutVideoUrl", "");
                   }}
                   className="px-6 py-3 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                 >
                   Remove Video
                 </button>
              )}
            </div>
            
            {settings.siteConfig.aboutVideoUrl && !videoFile && (
              <p className="text-xs text-muted-foreground mt-2">
                Currently active video: <a href={settings.siteConfig.aboutVideoUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{settings.siteConfig.aboutVideoUrl.substring(0, 50)}...</a>
              </p>
            )}
            {videoFile && (
              <p className="text-xs text-primary mt-2">
                Ready to upload: {videoFile.name}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-2">Uploading a video will automatically change the About layout to display it. Click 'Remove Video' and Save to revert to text-only.</p>
          </div>

          <div className="pt-4 border-t border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">Waitlist Popup</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Popup Title</label>
                <input
                  type="text"
                  value={settings.siteConfig.waitlistPopupTitle}
                  onChange={(e) => updateConfig("waitlistPopupTitle", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/30"
                  placeholder="e.g. Free AI Course Coming Soon 🚀"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Popup Description</label>
                <input
                  type="text"
                  value={settings.siteConfig.waitlistPopupDescription}
                  onChange={(e) => updateConfig("waitlistPopupDescription", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/30"
                  placeholder="e.g. Be the first to get access when we launch."
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Popup Detail (Small Text)</label>
                <textarea
                  rows={2}
                  value={settings.siteConfig.waitlistPopupDetail}
                  onChange={(e) => updateConfig("waitlistPopupDetail", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/30 resize-none"
                  placeholder="Join early and learn how to use AI tools..."
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 disabled:opacity-50 transition-opacity mt-4"
          >
            <Save size={18} />
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsManager;
