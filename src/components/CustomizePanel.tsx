import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface CustomizePanelProps {
  config: {
    enableTop: boolean;
    enableMiddle: boolean;
    enableBottom: boolean;
    lineCount: number;
    lineDistance: number;
    bendRadius: number;
    bendStrength: number;
  };
  onConfigChange: (config: CustomizePanelProps['config']) => void;
}

export default function CustomizePanel({ config, onConfigChange }: CustomizePanelProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 hover:scale-105 transition-all duration-300"
        >
          <Settings className="w-4 h-4" />
          Customize
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[320px] bg-background/95 backdrop-blur-xl border-border/50">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Customize</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-8">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Top Wave</label>
            <Switch
              checked={config.enableTop}
              onCheckedChange={(checked) =>
                onConfigChange({ ...config, enableTop: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Middle Wave</label>
            <Switch
              checked={config.enableMiddle}
              onCheckedChange={(checked) =>
                onConfigChange({ ...config, enableMiddle: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Bottom Wave</label>
            <Switch
              checked={config.enableBottom}
              onCheckedChange={(checked) =>
                onConfigChange({ ...config, enableBottom: checked })
              }
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Line Count</label>
              <span className="text-sm text-muted-foreground">{config.lineCount}</span>
            </div>
            <Slider
              value={[config.lineCount]}
              onValueChange={(value) =>
                onConfigChange({ ...config, lineCount: value[0] })
              }
              min={1}
              max={20}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Line Distance</label>
              <span className="text-sm text-muted-foreground">{config.lineDistance}</span>
            </div>
            <Slider
              value={[config.lineDistance]}
              onValueChange={(value) =>
                onConfigChange({ ...config, lineDistance: value[0] })
              }
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Bend Radius</label>
              <span className="text-sm text-muted-foreground">{config.bendRadius}</span>
            </div>
            <Slider
              value={[config.bendRadius]}
              onValueChange={(value) =>
                onConfigChange({ ...config, bendRadius: value[0] })
              }
              min={1}
              max={10}
              step={0.5}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Bend Strength</label>
              <span className="text-sm text-muted-foreground">{config.bendStrength.toFixed(2)}</span>
            </div>
            <Slider
              value={[config.bendStrength]}
              onValueChange={(value) =>
                onConfigChange({ ...config, bendStrength: value[0] })
              }
              min={-2}
              max={2}
              step={0.05}
              className="w-full"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
