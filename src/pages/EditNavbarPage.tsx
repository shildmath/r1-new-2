
import React, { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { getNavbarConfig, setNavbarConfig, NavbarConfig, NavbarItem } from "@/utils/navbarConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EditNavbarPage = () => {
  const [config, setConfigState] = useState<NavbarConfig>(getNavbarConfig());
  const [navItems, setNavItems] = useState<NavbarItem[]>(config.navItems);
  const [brand, setBrand] = useState(config.brand);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNavItems(config.navItems);
    setBrand(config.brand);
  }, [config]);

  const handleNavItemChange = (idx: number, field: keyof NavbarItem, value: string) => {
    setNavItems(items =>
      items.map((item, i) => (i === idx ? { ...item, [field]: value } : item))
    );
  };

  const handleAddItem = () => {
    setNavItems([...navItems, { name: "New", path: "/" }]);
  };

  const handleRemoveItem = (idx: number) => {
    setNavItems(navItems.filter((_, i) => i !== idx));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const newConfig: NavbarConfig = { brand, navItems };
    setNavbarConfig(newConfig);
    setConfigState(newConfig);

    // Notify other components to reload config
    window.dispatchEvent(new Event("navbarConfigUpdated"));

    setSaving(false);
  };

  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 p-8 flex flex-col items-start">
        <h1 className="text-3xl font-bold mb-8">Edit Navbar (Admin)</h1>
        <form className="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-xl space-y-6" onSubmit={handleSave}>
          <div>
            <label className="block text-sm font-medium mb-1">Brand Name</label>
            <Input value={brand} onChange={e => setBrand(e.target.value)} className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Navigation Items</label>
            <div className="space-y-2">
              {navItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input
                    value={item.name}
                    onChange={e => handleNavItemChange(idx, "name", e.target.value)}
                    className="w-1/3"
                    placeholder="Name"
                  />
                  <Input
                    value={item.path}
                    onChange={e => handleNavItemChange(idx, "path", e.target.value)}
                    className="w-2/3"
                    placeholder="Path"
                  />
                  <Button type="button" variant="destructive" onClick={() => handleRemoveItem(idx)} size="icon">
                    &times;
                  </Button>
                </div>
              ))}
            </div>
            <Button type="button" className="mt-3" onClick={handleAddItem}>Add Navigation Item</Button>
          </div>
          <div className="flex gap-3 justify-end">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditNavbarPage;
