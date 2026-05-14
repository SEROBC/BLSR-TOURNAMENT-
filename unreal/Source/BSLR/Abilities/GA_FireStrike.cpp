#include "GA_FireStrike.h"

void UGA_FireStrike::ActivateAbility(
    const FGameplayAbilitySpecHandle Handle,
    const FGameplayAbilityActorInfo* ActorInfo,
    const FGameplayAbilityActivationInfo ActivationInfo,
    const FGameplayEventData* TriggerEventData
) {

    EndAbility(CurrentSpecHandle,
               CurrentActorInfo,
               CurrentActivationInfo,
               true,
               false);
}
