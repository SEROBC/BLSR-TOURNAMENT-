#pragma once

#include "CoreMinimal.h"
#include "AttributeSet.h"
#include "AbilitySystemComponent.h"
#include "BSLRAttributeSet.generated.h"

UCLASS()
class BSLR_API UBSLRAttributeSet : public UAttributeSet
{
    GENERATED_BODY()

public:

    UPROPERTY(BlueprintReadOnly)
    FGameplayAttributeData Health;

    UPROPERTY(BlueprintReadOnly)
    FGameplayAttributeData Energy;

    UPROPERTY(BlueprintReadOnly)
    FGameplayAttributeData CritChance;
};
