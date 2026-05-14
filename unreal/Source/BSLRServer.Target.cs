using UnrealBuildTool;
using System.Collections.Generic;

public class BSLRServerTarget : TargetRules
{
    public BSLRServerTarget(TargetInfo Target) : base(Target)
    {
        Type = TargetType.Server;

        DefaultBuildSettings = BuildSettingsVersion.V2;

        ExtraModuleNames.Add("BSLR");
    }
}
